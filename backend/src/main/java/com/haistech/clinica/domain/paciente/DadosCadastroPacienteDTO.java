package com.haistech.clinica.domain.paciente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DadosCadastroPacienteDTO(
        @NotBlank
        String nome,
        
        @NotBlank
        String cpf,
        
        @NotNull
        LocalDate dataNascimento,
        
        @NotBlank
        String telefone,
        
        @NotBlank
        @Email
        String email
) {
}
