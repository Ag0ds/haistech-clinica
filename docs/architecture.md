# 🏗️ HAIS Tech - C4 Model Architecture

This document describes the software architecture of the HAIS Tech Clinical platform using the [C4 Model](https://c4model.com/). Diagrams are generated using Mermaid.js.

## 1. System Context Diagram (Level 1)
Shows the macro view of the system and its interactions with external actors.

```mermaid
C4Context
  title System Context diagram for HAIS Tech

  Person(doctor, "Healthcare Professional", "A doctor or nurse managing patients and clinical evolutions.")
  
  System(hais_tech, "HAIS Tech Platform", "Allows tracking of patients, clinical evolutions, and vitals.")
  
  System_Ext(rabbitmq, "RabbitMQ", "Message Broker for asynchronous events and notifications.")
  System_Ext(postgres, "Supabase PostgreSQL", "Cloud Database for persistent data storage.")

  Rel(doctor, hais_tech, "Manages patients and records evolutions via", "HTTPS")
  Rel(hais_tech, rabbitmq, "Publishes 'EvolutionCreated' events to", "AMQP")
  Rel(hais_tech, postgres, "Reads from and writes to", "JDBC")
```

---

## 2. Container Diagram (Level 2)
Shows the high-level technical architecture and how responsibilities are distributed.

```mermaid
C4Container
  title Container diagram for HAIS Tech

  Person(doctor, "Healthcare Professional", "User of the platform")

  System_Boundary(c1, "HAIS Tech System") {
    Container(web_app, "Web Application", "Next.js, React, Tailwind", "Delivers the Dark UI/HUD clinical interface to the user's browser.")
    Container(api_app, "API Application", "Java 17, Spring Boot 3", "Handles business logic, validations, and database access.")
  }

  System_Ext(rabbitmq, "RabbitMQ", "Message Broker")
  System_Ext(postgres, "PostgreSQL", "Database")

  Rel(doctor, web_app, "Visits and interacts", "HTTPS")
  Rel(web_app, api_app, "Makes API calls to", "JSON/HTTPS")
  Rel(api_app, postgres, "Reads/Writes", "JDBC")
  Rel(api_app, rabbitmq, "Sends async messages to", "AMQP")
```

---

## 3. Component Diagram (Level 3 - API Application)
Shows the internal structure of the Spring Boot Application and the applied Design Patterns.

```mermaid
C4Component
  title Component diagram for the API Application

  Container(web_app, "Web Application", "Next.js", "Client SPA")

  Container_Boundary(api, "API Application (Spring Boot)") {
    Component(exception_handler, "GlobalErrorHandler", "@ControllerAdvice", "Intercepts exceptions and formats standard JSON responses.")
    
    Component(paciente_controller, "PacienteController", "REST Controller", "Exposes /pacientes endpoints.")
    Component(evolucao_controller, "EvolucaoController", "REST Controller", "Exposes /evolucoes endpoints.")
    
    Component(paciente_service, "PacienteService", "Service/Facade", "Business rules, date and CPF validations.")
    Component(evolucao_service, "EvolucaoService", "Service/Facade", "Validates vitals and orchestrates messaging.")
    
    Component(paciente_repo, "PacienteRepository", "Spring Data JPA", "Database abstraction for Patients.")
    Component(evolucao_repo, "EvolucaoRepository", "Spring Data JPA", "Database abstraction for Evolutions.")
    
    Component(message_producer, "EvolucaoMessageProducer", "RabbitTemplate", "Publishes async events.")
  }

  System_Ext(postgres, "PostgreSQL", "Database")
  System_Ext(rabbitmq, "RabbitMQ", "Message Broker")

  Rel(web_app, paciente_controller, "Makes REST calls to", "JSON/HTTPS")
  Rel(web_app, evolucao_controller, "Makes REST calls to", "JSON/HTTPS")
  Rel(web_app, exception_handler, "Receives formatted errors from")

  Rel(paciente_controller, paciente_service, "Delegates to")
  Rel(evolucao_controller, evolucao_service, "Delegates to")

  Rel(paciente_service, paciente_repo, "Uses")
  Rel(evolucao_service, evolucao_repo, "Uses")
  Rel(evolucao_service, message_producer, "Triggers event via")

  Rel(paciente_repo, postgres, "Reads/Writes", "JDBC")
  Rel(evolucao_repo, postgres, "Reads/Writes", "JDBC")
  Rel(message_producer, rabbitmq, "Sends payload to", "AMQP")
```
