package com.example.virtq.config;

import com.example.virtq.domain.Question;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class QuestionWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final CopyOnWriteArrayList<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("WebSocket connection established: " + session.getId());
        sessions.add(session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Handle later
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        System.out.println("WebSocket connection closed: " + session.getId());
        sessions.remove(session);
    }

    public void sendNewQuestion(Question question) {
        try {
            Map<String, Object> payload = new HashMap<>();
            payload.put("id", question.getId());
            payload.put("text", question.getText());
            payload.put("approved", question.isApproved());
            payload.put("qaIdentifier", question.getQa().getQaIdentifier());

            String json = objectMapper.writeValueAsString(payload);
            for(WebSocketSession session : sessions) {
                if(session.isOpen()) {
                    session.sendMessage(new TextMessage(json));
                }
            }
        } catch (IOException e) {
            System.err.println("WebSocket broadcast error");
            e.printStackTrace();
        }
    }
}
