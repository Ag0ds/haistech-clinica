# HAIS Tech - Clinical Data Registry 🧬

Bem-vindo ao repositório oficial da plataforma HaisTech. Um sistema corporativo, high-tech e premium de gestão hospitalar.

## Arquitetura do Sistema
- **Frontend**: Next.js 15, React 19, Tailwind CSS (Tema Dark UI/HUD Clínico)
- **Backend**: Java 17, Spring Boot 3
- **Banco de Dados**: PostgreSQL
- **Mensageria**: RabbitMQ (Comunicação Assíncrona e Notificações)
- **Infraestrutura**: Docker & Kubernetes.

## Orquestração Kubernetes
Para testar a resiliência em containers (Kubernetes / Minikube):
```bash
kubectl apply -f k8s/
```
Isso implantará os LoadBalancers, PersistentVolumes, Deployments (Spring Boot e Next.js) e Serviços Internos para que eles se comuniquem perfeitamente.
