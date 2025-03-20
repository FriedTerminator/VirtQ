package com.example.virtq.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketConfigurer {

    private final QuestionWebSocketHandler questionWebSocketHandler;

    public WebSocketConfig(QuestionWebSocketHandler questionWebSocketHandler) {
        this.questionWebSocketHandler = questionWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(questionWebSocketHandler, "/ws/questions").setAllowedOrigins("*");
    }
}
