package com.haistech.clinica.domain.paciente;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    private final PacienteService service;

    public PacienteController(PacienteService service) {
        this.service = service;
    }

    // O Garçom anotando o pedido de um novo cliente (POST)
    @PostMapping
    public ResponseEntity<Paciente> cadastrar(@RequestBody @Valid DadosCadastroPacienteDTO dados, UriComponentsBuilder uriBuilder) {
        // Envia o envelope para a cozinha
        Paciente pacienteSalvo = service.cadastrar(dados);

        // Boas práticas de API REST: devolver a URL (endereço) do novo recurso criado e código 201
        URI uri = uriBuilder.path("/pacientes/{id}").buildAndExpand(pacienteSalvo.getId()).toUri();
        return ResponseEntity.created(uri).body(pacienteSalvo);
    }

    // O Garçom entregando a lista de clientes do restaurante (GET)
    @GetMapping
    public ResponseEntity<List<Paciente>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    // O Garçom buscando um cliente específico (GET por ID)
    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    // O Garçom atualizando o pedido (PUT)
    @PutMapping
    public ResponseEntity<Paciente> atualizar(@RequestBody @Valid DadosAtualizacaoPacienteDTO dados) {
        Paciente pacienteAtualizado = service.atualizar(dados);
        return ResponseEntity.ok(pacienteAtualizado);
    }
}
