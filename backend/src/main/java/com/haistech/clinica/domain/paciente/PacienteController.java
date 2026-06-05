package com.haistech.clinica.domain.paciente;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

import com.haistech.clinica.service.IaAnaliseService;
import com.haistech.clinica.dto.IaAnaliseResponse;
import com.haistech.clinica.infra.security.RateLimiterService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/pacientes")
@CrossOrigin(origins = "*")
public class PacienteController {

    private final PacienteService service;
    private final IaAnaliseService iaAnaliseService;
    private final RateLimiterService rateLimiterService;

    public PacienteController(PacienteService service, IaAnaliseService iaAnaliseService, RateLimiterService rateLimiterService) {
        this.service = service;
        this.iaAnaliseService = iaAnaliseService;
        this.rateLimiterService = rateLimiterService;
    }

    @PostMapping
    public ResponseEntity<Paciente> cadastrar(@RequestBody @Valid DadosCadastroPacienteDTO dados, UriComponentsBuilder uriBuilder) {
        Paciente pacienteSalvo = service.cadastrar(dados);

        URI uri = uriBuilder.path("/pacientes/{id}").buildAndExpand(pacienteSalvo.getId()).toUri();
        return ResponseEntity.created(uri).body(pacienteSalvo);
    }

    @GetMapping
    public ResponseEntity<List<Paciente>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping
    public ResponseEntity<Paciente> atualizar(@RequestBody @Valid DadosAtualizacaoPacienteDTO dados) {
        Paciente pacienteAtualizado = service.atualizar(dados);
        return ResponseEntity.ok(pacienteAtualizado);
    }


    @GetMapping("/{id}/ia-analise")
    public ResponseEntity<IaAnaliseResponse> gerarAnaliseIa(@PathVariable Long id, HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        
        if (!rateLimiterService.isAllowed(clientIp)) {
            throw new IllegalArgumentException("Limite de chamadas atingido! Por favor, aguarde 30 segundos para gerar uma nova análise da IA.");
        }

        return ResponseEntity.ok(new IaAnaliseResponse(iaAnaliseService.gerarAnalise(id)));
    }
}
