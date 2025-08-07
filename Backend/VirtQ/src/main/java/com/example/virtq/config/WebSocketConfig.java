package com.example.virtq.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private final QuestionWebSocketHandler questionWebSocketHandler;

    public WebSocketConfig(QuestionWebSocketHandler questionWebSocketHandler) {
        this.questionWebSocketHandler = questionWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(questionWebSocketHandler, "/ws/questions").setAllowedOrigins("*");
    }
}
