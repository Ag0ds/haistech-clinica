package com.haistech.clinica.domain.evolucao;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

public record DadosCadastroEvolucaoDTO(
        @NotNull
        Long pacienteId,
        
        @Pattern(regexp = "^\\d{2,3}/\\d{2,3}$", message = "O formato da pressão arterial deve ser X/Y, ex: 120/80")
        String pressaoArterial,
        
        @Positive(message = "O peso não pode ser zero ou negativo")
        Double peso,

        @NotBlank(message = "A descrição é obrigatória")
        String descricao
) {
}
