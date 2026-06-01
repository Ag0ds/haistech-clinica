package com.haistech.clinica.infra.rabbitmq;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String FILA_NOTIFICACOES = "notificacoes.evolucao";

    // Cria a fila automaticamente se ela não existir
    @Bean
    public Queue filaNotificacoes() {
        return new Queue(FILA_NOTIFICACOES, true);
    }

    // Configura o conversor para transformar objetos Java em JSON automaticamente
    @Bean
    public org.springframework.amqp.support.converter.MessageConverter messageConverter() {
        return new org.springframework.amqp.support.converter.JacksonJsonMessageConverter();
    }
}
