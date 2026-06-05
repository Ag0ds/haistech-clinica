package com.haistech.clinica.domain.paciente;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PacienteService {

    private final PacienteRepository repository;

    public PacienteService(PacienteRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Paciente cadastrar(DadosCadastroPacienteDTO dados) {
        // Regra de Negócio: Não podemos ter dois pacientes com o mesmo CPF
        if (repository.existsByCpf(dados.cpf())) {
            throw new IllegalArgumentException("Já existe um paciente cadastrado com este CPF.");
        }

        // Convertemos o nosso "envelope" (DTO) para a "panela" (Entidade)
        Paciente novoPaciente = new Paciente(dados);

        return repository.save(novoPaciente);
    }

    public List<Paciente> listarTodos() {
        return repository.findAll();
    }

    public Paciente buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Paciente não encontrado."));
    }

    @Transactional
    public Paciente atualizar(DadosAtualizacaoPacienteDTO dados) {
        Paciente paciente = buscarPorId(dados.id());
        
        paciente.atualizarInformacoes(dados);
        
        return repository.save(paciente);
    }
}
