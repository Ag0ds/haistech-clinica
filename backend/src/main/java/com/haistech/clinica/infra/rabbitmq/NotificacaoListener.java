package com.haistech.clinica.infra.rabbitmq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class NotificacaoListener {

    // Este método fica escutando a fila. Assim que chegar uma mensagem nova, ele acorda e processa.
    // É isso que significa comunicação ASSÍNCRONA!
    @RabbitListener(queues = RabbitMQConfig.FILA_NOTIFICACOES)
    public void processarNotificacao(String mensagem) {
        System.out.println("=========================================");
        System.out.println("🔔 NOVA NOTIFICAÇÃO ASSÍNCRONA RECEBIDA 🔔");
        System.out.println(mensagem);
        System.out.println("=========================================");
        // Em um projeto real, aqui chamaríamos um serviço de envio de Email ou SMS.
    }
}
