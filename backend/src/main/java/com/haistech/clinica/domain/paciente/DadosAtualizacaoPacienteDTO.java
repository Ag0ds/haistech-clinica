package com.haistech.clinica.domain.paciente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosAtualizacaoPacienteDTO(
        @NotNull
        Long id,
        String nome,
        @Pattern(regexp = "^\\(\\d{2}\\) \\d{4,5}-\\d{4}$", message = "Formato de telefone inválido. Use (XX) XXXXX-XXXX")
        String telefone,
        @Email(message = "Formato de e-mail inválido")
        String email
) {
}
