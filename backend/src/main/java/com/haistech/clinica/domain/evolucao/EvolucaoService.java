package com.haistech.clinica.domain.evolucao;

import com.haistech.clinica.domain.paciente.Paciente;
import com.haistech.clinica.domain.paciente.PacienteRepository;
import com.haistech.clinica.infra.rabbitmq.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EvolucaoService {

    private final EvolucaoRepository evolucaoRepository;
    private final PacienteRepository pacienteRepository;
    private final RabbitTemplate rabbitTemplate;

    public EvolucaoService(EvolucaoRepository evolucaoRepository, PacienteRepository pacienteRepository, RabbitTemplate rabbitTemplate) {
        this.evolucaoRepository = evolucaoRepository;
        this.pacienteRepository = pacienteRepository;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Transactional
    public Evolucao registrarEvolucao(DadosCadastroEvolucaoDTO dados) {
        // Regra de Negócio: O paciente precisa existir
        Paciente paciente = pacienteRepository.findById(dados.pacienteId())
                .orElseThrow(() -> new IllegalArgumentException("Paciente não encontrado para registrar evolução."));

        // Cria a evolução
        Evolucao novaEvolucao = new Evolucao(dados, paciente);
        Evolucao evolucaoSalva = evolucaoRepository.save(novaEvolucao);

        // Comunicação Assíncrona: Envia uma mensagem para a fila avisando que houve uma nova evolução!
        String mensagemNotificacao = "Nova evolução registrada para o paciente " + paciente.getNome() + ": " + dados.descricao();
        rabbitTemplate.convertAndSend(RabbitMQConfig.FILA_NOTIFICACOES, mensagemNotificacao);

        return evolucaoSalva;
    }

    @Transactional
    public Evolucao atualizarEvolucao(Long id, DadosAtualizacaoEvolucaoDTO dados) {
        Evolucao evolucao = evolucaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Evolução não encontrada."));
        
        evolucao.atualizarInformacoes(dados);
        return evolucao;
    }

    @Transactional
    public void excluirEvolucao(Long id) {
        if (!evolucaoRepository.existsById(id)) {
            throw new IllegalArgumentException("Evolução não encontrada.");
        }
        evolucaoRepository.deleteById(id);
    }

    public List<Evolucao> listarHistoricoDoPaciente(Long pacienteId) {
        return evolucaoRepository.findAllByPacienteIdOrderByDataRegistroDesc(pacienteId);
    }
}
