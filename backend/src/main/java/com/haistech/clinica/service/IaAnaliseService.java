package com.haistech.clinica.service;

import com.haistech.clinica.domain.evolucao.Evolucao;
import com.haistech.clinica.domain.paciente.Paciente;
import com.haistech.clinica.domain.evolucao.EvolucaoRepository;
import com.haistech.clinica.domain.paciente.PacienteRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpStatusCodeException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@Service
public class IaAnaliseService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final PacienteRepository pacienteRepository;
    private final EvolucaoRepository evolucaoRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public IaAnaliseService(PacienteRepository pacienteRepository, EvolucaoRepository evolucaoRepository) {
        this.pacienteRepository = pacienteRepository;
        this.evolucaoRepository = evolucaoRepository;
    }

    public String gerarAnalise(Long pacienteId) {
        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new IllegalArgumentException("Paciente não encontrado."));

        List<Evolucao> evolucoes = evolucaoRepository.findAllByPacienteIdOrderByDataRegistroDesc(pacienteId);

        String prompt = montarPrompt(paciente, evolucoes);
        return chamarApiGemini(prompt);
    }

    private String montarPrompt(Paciente paciente, List<Evolucao> evolucoes) {
        StringBuilder sb = new StringBuilder();
        sb.append("Atue como um Especialista Clínico Sênior. Analise o seguinte histórico do paciente e me devolva um resumo médico.\n");
        sb.append("O formato da sua resposta deve ser em markdown (sem usar o bloco de código markdown ```markdown), dividida em:\n");
        sb.append("### 1. Resumo do Quadro Clínico\n");
        sb.append("### 2. Riscos Imediatos ou Alertas\n");
        sb.append("### 3. Recomendações de Acompanhamento\n\n");
        
        sb.append("DADOS DO PACIENTE:\n");
        sb.append("- Nome: ").append(paciente.getNome()).append("\n");
        sb.append("- Data de Nascimento: ").append(paciente.getDataNascimento()).append("\n\n");
        
        sb.append("EVOLUÇÕES CLÍNICAS:\n");
        if (evolucoes.isEmpty()) {
            sb.append("Nenhuma evolução registrada.\n");
        } else {
            for (Evolucao e : evolucoes) {
                sb.append("--- Em ").append(e.getDataRegistro())
                  .append(" | Pressão: ").append(e.getPressaoArterial() != null ? e.getPressaoArterial() : "N/A")
                  .append(" | Peso: ").append(e.getPeso() != null ? e.getPeso() + "kg" : "N/A").append("\n");
                sb.append("Descrição: ").append(e.getDescricao()).append("\n");
            }
        }
        
        return sb.toString();
    }

    private String chamarApiGemini(String prompt) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new java.util.HashMap<>();
        body.put("contents", List.of(
            Map.of("parts", List.of(
                Map.of("text", prompt)
            ))
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            String responseBody = response.getBody();
            
            if (responseBody != null) {
                JsonNode rootNode = objectMapper.readTree(responseBody);
                JsonNode candidatesNode = rootNode.path("candidates");
                
                if (candidatesNode.isArray() && !candidatesNode.isEmpty()) {
                    JsonNode textNode = candidatesNode.get(0).path("content").path("parts").get(0).path("text");
                    return textNode.asText();
                }
            }
            return "Não foi possível gerar a análise. A IA retornou uma resposta vazia.";
        } catch (HttpStatusCodeException e) {
            System.err.println("Erro HTTP da API do Gemini: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            if (e.getStatusCode().value() == 429) {
                return "Limite de requisições gratuitas do Google Gemini atingido. Por favor, aguarde alguns segundos e tente novamente.";
            }
            return "Erro de comunicação com a inteligência artificial. Verifique sua chave de API.";
        } catch (Exception e) {
            System.err.println("Erro interno ao chamar API do Gemini: " + e.getMessage());
            return "Erro interno ao comunicar com a IA Assistant.";
        }
    }
}
