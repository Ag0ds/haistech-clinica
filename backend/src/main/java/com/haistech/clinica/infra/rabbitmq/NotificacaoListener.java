package com.haistech.clinica.infra.rabbitmq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class NotificacaoListener {

    @RabbitListener(queues = RabbitMQConfig.FILA_NOTIFICACOES)
    public void processarNotificacao(String mensagem) {
        System.out.println("=========================================");
        System.out.println("🔔 NOVA NOTIFICAÇÃO ASSÍNCRONA RECEBIDA 🔔");
        System.out.println(mensagem);
        System.out.println("=========================================");
    }
}
