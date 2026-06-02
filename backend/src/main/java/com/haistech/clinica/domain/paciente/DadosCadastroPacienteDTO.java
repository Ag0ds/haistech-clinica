package com.haistech.clinica.domain.paciente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;

public record DadosCadastroPacienteDTO(
        @NotBlank(message = "O nome é obrigatório")
        String nome,
        
        @NotBlank(message = "O CPF é obrigatório")
        @CPF(message = "O formato do CPF é inválido")
        String cpf,
        
        @NotNull(message = "A data de nascimento é obrigatória")
        @Past(message = "A data de nascimento deve estar no passado")
        LocalDate dataNascimento,
        
        @NotBlank(message = "O telefone é obrigatório")
        @Pattern(regexp = "^\\(\\d{2}\\) \\d{4,5}-\\d{4}$", message = "Formato de telefone inválido. Use (XX) XXXXX-XXXX")
        String telefone,
        
        @NotBlank(message = "O e-mail é obrigatório")
        @Email(message = "Formato de e-mail inválido")
        String email
) {
}
