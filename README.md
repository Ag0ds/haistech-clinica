# HaisTech - Sistema de Acompanhamento Clínico

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange)
![Licença](https://img.shields.io/badge/License-MIT-blue.svg)

Sistema fullstack desenvolvido como parte do Desafio Técnico para Desenvolvedor(a) Fullstack Júnior da HaisTech. O objetivo da aplicação é permitir o acompanhamento clínico de pacientes, garantindo alta disponibilidade, robustez e boas práticas de arquitetura.

## 🚀 Tecnologias Utilizadas

**Backend:**
- Java 17
- Spring Boot 3
- PostgreSQL
- Mensageria com RabbitMQ (Comunicação Assíncrona)

**Frontend:**
- Next.js (React)
- TailwindCSS

**Infraestrutura e DevOps:**
- Docker & Docker Compose
- CI/CD com GitHub Actions
- Kubernetes (K8s)

## 📋 Funcionalidades
- Cadastro, listagem e edição de pacientes.
- Registro de evoluções clínicas.
- Visualização de histórico clínico.
- Notificações assíncronas automáticas baseadas no registro de evoluções.

## 📐 Arquitetura

O sistema adota uma **Arquitetura em Camadas** (Layered Architecture) no backend, utilizando o **Padrão Repository** e o **Padrão DTO** para isolamento de dados e segurança. O Frontend consome a API RESTful e a comunicação de notificação ocorre de forma assíncrona orientada a eventos.

---
*Desenvolvido como resolução do desafio HaisTech.*
