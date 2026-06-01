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

    @NotBlank
    private String descricao;

    @NotNull
    private LocalDateTime dataRegistro;

    public Evolucao(Paciente paciente, String descricao) {
        this.paciente = paciente;
        this.descricao = descricao;
        this.dataRegistro = LocalDateTime.now(); // Pega a data e hora exata do servidor no momento do registro
    }
}
