package com.haistech.clinica.domain.evolucao;

import com.haistech.clinica.domain.paciente.Paciente;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "evolucoes")
@Entity(name = "Evolucao")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Evolucao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relacionamento: Muitos registros de Evolução podem pertencer a Um Paciente
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    private String pressaoArterial;
    private Double peso;

    @NotBlank
    private String descricao;

    @NotNull
    private LocalDateTime dataRegistro;

    public Evolucao(DadosCadastroEvolucaoDTO dados, Paciente paciente) {
        this.paciente = paciente;
        this.pressaoArterial = dados.pressaoArterial();
        this.peso = dados.peso();
        this.descricao = dados.descricao();
        this.dataRegistro = LocalDateTime.now(); // Pega a data e hora exata do servidor no momento do registro
    }

    public void atualizarInformacoes(DadosAtualizacaoEvolucaoDTO dados) {
        if (dados.pressaoArterial() != null) {
            this.pressaoArterial = dados.pressaoArterial();
        }
        if (dados.peso() != null) {
            this.peso = dados.peso();
        }
        if (dados.descricao() != null) {
            this.descricao = dados.descricao();
        }
    }
}
