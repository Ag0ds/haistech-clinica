package com.haistech.clinica.domain.evolucao;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroEvolucaoDTO(
        @NotNull
        Long pacienteId,
        
        @NotBlank
        String descricao
) {
}
