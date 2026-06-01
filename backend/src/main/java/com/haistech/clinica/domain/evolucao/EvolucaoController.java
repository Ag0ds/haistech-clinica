package com.haistech.clinica.domain.evolucao;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/evolucoes")
public class EvolucaoController {

    private final EvolucaoService service;

    public EvolucaoController(EvolucaoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Evolucao> registrar(@RequestBody @Valid DadosCadastroEvolucaoDTO dados, UriComponentsBuilder uriBuilder) {
        Evolucao evolucaoSalva = service.registrarEvolucao(dados);
        
        URI uri = uriBuilder.path("/evolucoes/{id}").buildAndExpand(evolucaoSalva.getId()).toUri();
        return ResponseEntity.created(uri).body(evolucaoSalva);
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<Evolucao>> listarHistorico(@PathVariable Long pacienteId) {
        return ResponseEntity.ok(service.listarHistoricoDoPaciente(pacienteId));
    }
}
