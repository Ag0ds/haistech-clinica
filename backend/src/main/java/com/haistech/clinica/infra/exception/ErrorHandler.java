package com.haistech.clinica.infra.exception;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class ErrorHandler {

    // Trata erros de recurso não encontrado (ex: id inexistente)
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Void> tratarErro404() {
        return ResponseEntity.notFound().build();
    }

    // Trata erros de validação (@NotBlank, @CPF, @Pattern, etc)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<DadosErroValidacao>> tratarErro400(MethodArgumentNotValidException ex) {
        var erros = ex.getFieldErrors();
        return ResponseEntity.badRequest().body(erros.stream().map(DadosErroValidacao::new).toList());
    }

    // Trata erros de banco de dados (ex: Constraint Violation - CPF já cadastrado)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> tratarErroIntegridadeBanco(DataIntegrityViolationException ex) {
        return ResponseEntity.badRequest().body("{\"erro\": \"Violação de integridade no banco de dados. Verifique se o CPF ou E-mail já estão cadastrados.\"}");
    }

    // Trata IllegalArgumentException (regras de negócio simples)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> tratarErroRegraDeNegocio(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body("{\"erro\": \"" + ex.getMessage() + "\"}");
    }

    // Record para formatar a mensagem de erro de forma elegante
    private record DadosErroValidacao(String campo, String mensagem) {
        public DadosErroValidacao(FieldError erro) {
            this(erro.getField(), erro.getDefaultMessage());
        }
    }
}
