package com.haistech.clinica.domain.evolucao;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvolucaoRepository extends JpaRepository<Evolucao, Long> {
    
    // Lista todas as evoluções de um paciente específico, ordenadas da mais recente para a mais antiga
    List<Evolucao> findAllByPacienteIdOrderByDataRegistroDesc(Long pacienteId);
}
