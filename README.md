<div align="center">
  <img src="./frontend/public/logo.png" alt="HAIS Tech Logo" width="150"/>
  <h1>HAIS Tech - Clinical Data Registry 🧬</h1>
  <p><strong>A Premium, High-Tech Hospital Management Platform</strong></p>
  
  [![Frontend Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](#)
  [![Backend Deployment](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render)](#)
  [![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](#)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](#)
  
  *Read this in: [English](#english) | [Português](#português)*
</div>

<br/>

---

<a id="português"></a>
# 🇧🇷 Documentação em Português

Bem-vindo ao repositório oficial da plataforma **HAIS Tech**. Este projeto é uma solução corporativa *Full-Stack* voltada para o gerenciamento clínico de pacientes, com foco absoluto em resiliência, arquitetura limpa (Clean Architecture) e UX moderna.

## Live Demo (Links de Apresentação)
- **Frontend (UI)**: [https://haistech-clinica.vercel.app](https://haistech-clinica.vercel.app)
- **Backend (API)**: [https://haistech-backend.onrender.com](https://haistech-backend.onrender.com)
- **Documentação C4 Model**: [Ver Arquitetura Completa](./docs/architecture.md)

---

## Design Patterns e Arquitetura

Este projeto foi construído seguindo estritamente as diretrizes de padrões de projeto e arquitetura de software corporativa exigidas no escopo. 

Abaixo, os padrões aplicados, seus locais no código e as justificativas arquiteturais:

### 1. DTO (Data Transfer Object) Pattern
- **Onde foi aplicado**: `PacienteRecord`, `EvolucaoRecord` e pacotes `dto` no Spring Boot.
- **Justificativa**: Garante a proteção das entidades de domínio JPA (`Paciente`, `Evolucao`). Evita vulnerabilidades de *Mass Assignment* (Over-posting), expondo apenas os dados necessários para o frontend e economizando banda de rede.

### 2. Repository Pattern (Data Access Object)
- **Onde foi aplicado**: `PacienteRepository` e `EvolucaoRepository`.
- **Justificativa**: Abstrai completamente a camada de persistência. A regra de negócio não sabe se os dados vêm de um PostgreSQL ou de um arquivo de texto. Isso garante o princípio de Responsabilidade Única (SRP) e facilita a troca de bancos de dados no futuro.

### 3. Service Layer (Facade Pattern)
- **Onde foi aplicado**: `PacienteService` e `EvolucaoService`.
- **Justificativa**: Remove regras de negócio, formatações e validações lógicas de dentro dos `Controllers`. O *Controller* foca apenas no tráfego HTTP, enquanto o *Service* age como uma "Fachada" que orquestra acesso a dados, envio de mensagens e tratamento de exceções.

### 4. Event-Driven Architecture (Publisher/Subscriber)
- **Onde foi aplicado**: Integração com RabbitMQ (`EvolucaoMessageProducer`).
- **Justificativa**: Desacoplamento assíncrono. O processo de salvar uma evolução clínica não deve bloquear a resposta ao usuário. O padrão *Pub/Sub* permite que a evolução seja salva e que o envio de e-mails/notificações seja processado separadamente por "Workers" em segundo plano.

### 5. Global Exception Handling (Strategy Pattern via @Advice)
- **Onde foi aplicado**: `GlobalErrorHandler.java` usando `@RestControllerAdvice`.
- **Justificativa**: Padroniza as respostas de erro da API para o Frontend de forma centralizada. Evita blocos `try-catch` repetitivos em todo o código e garante que o cliente sempre receba mensagens JSON consistentes com status HTTP adequados.

---

## Tecnologias Utilizadas

### Frontend
- **Next.js 15 (App Router)** + **React 19**
- **Tailwind CSS**: Com design *Dark HUD Clínico* 100% customizado
- Suporte a i18n (Internacionalização)

### Backend
- **Java 17** + **Spring Boot 3**
- **PostgreSQL** (Hospedado no Supabase)
- **RabbitMQ** (Mensageria para arquitetura assíncrona)
- **Lombok** e **Validation API**

### Infraestrutura & DevOps
- **Docker** e **Docker Compose**
- **Kubernetes** (Manifestos completos em `/k8s`)
- **GitHub Actions** para Integração Contínua (CI/CD)

---

<br/><br/>

<a id="english"></a>
# 🇺🇸 English Documentation

Welcome to the official repository of the **HAIS Tech** platform. This project is a Full-Stack enterprise solution aimed at clinical patient management, with an absolute focus on resilience, Clean Architecture, and modern UX.

## Live Demo (Presentation Links)
- **Frontend (UI)**: [https://haistech-clinica.vercel.app](https://haistech-clinica.vercel.app)
- **Backend (API)**: [https://haistech-backend.onrender.com](https://haistech-backend.onrender.com)
- **C4 Model Documentation**: [View Full Architecture](./docs/architecture.md)

---

## Design Patterns and Architecture

This project was built strictly following the design patterns and enterprise software architecture guidelines required in the scope.

Below are the patterns applied, their locations in the code, and their architectural justifications:

### 1. DTO (Data Transfer Object) Pattern
- **Where it was applied**: `PacienteRecord`, `EvolucaoRecord`, and `dto` packages in Spring Boot.
- **Justification**: Ensures the protection of JPA domain entities (`Paciente`, `Evolucao`). It prevents Mass Assignment (Over-posting) vulnerabilities by exposing only the necessary data to the frontend, thereby saving network bandwidth.

### 2. Repository Pattern (Data Access Object)
- **Where it was applied**: `PacienteRepository` and `EvolucaoRepository`.
- **Justification**: Completely abstracts the persistence layer. The business logic does not know whether data comes from a PostgreSQL database or a text file. This guarantees the Single Responsibility Principle (SRP) and makes it easier to swap databases in the future.

### 3. Service Layer (Facade Pattern)
- **Where it was applied**: `PacienteService` and `EvolucaoService`.
- **Justification**: Removes business rules, formatting, and logical validations from the `Controllers`. The *Controller* focuses solely on HTTP traffic, while the *Service* acts as a "Facade" that orchestrates data access, message sending, and exception handling.

### 4. Event-Driven Architecture (Publisher/Subscriber)
- **Where it was applied**: RabbitMQ integration (`EvolucaoMessageProducer`).
- **Justification**: Asynchronous decoupling. The process of saving a clinical evolution should not block the response to the user. The *Pub/Sub* pattern allows the evolution to be saved and emails/notifications to be processed separately by background Workers.

### 5. Global Exception Handling (Strategy Pattern via @Advice)
- **Where it was applied**: `GlobalErrorHandler.java` using `@RestControllerAdvice`.
- **Justification**: Standardizes API error responses to the Frontend in a centralized manner. It avoids repetitive `try-catch` blocks throughout the code and ensures that the client always receives consistent JSON messages with appropriate HTTP status codes.

---

## Tech Stack

### Frontend
- **Next.js 15 (App Router)** + **React 19**
- **Tailwind CSS**: With a 100% custom *Dark Clinical HUD* design
- i18n (Internationalization) support

### Backend
- **Java 17** + **Spring Boot 3**
- **PostgreSQL** (Hosted on Supabase)
- **RabbitMQ** (Messaging for asynchronous architecture)
- **Lombok** and **Validation API**

### Infrastructure & DevOps
- **Docker** and **Docker Compose**
- **Kubernetes** (Full manifests in `/k8s`)
- **GitHub Actions** for Continuous Integration (CI/CD)

---
<div align="center">
  <sub>Developed with 🩵 for HAIS Tech</sub>
</div>
