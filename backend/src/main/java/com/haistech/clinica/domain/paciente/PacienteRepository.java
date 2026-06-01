package com.haistech.clinica.domain.paciente;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    
    // O Spring Data JPA é tão inteligente que ele cria a query SQL de busca automaticamente
    // apenas lendo o nome desse método! 
    boolean existsByCpf(String cpf);
}
