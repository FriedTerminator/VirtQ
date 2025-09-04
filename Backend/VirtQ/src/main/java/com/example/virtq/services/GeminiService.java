package com.example.virtq.services;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {
    private final Client client;

    public GeminiService() {
        this.client = Client.builder()
                .apiKey(System.getenv("AIzaSyCAnv8mEbPKanL4J9lbJ0oxwi0ZldSTSAI"))
                .build();
    }

    public boolean isQuestionRelated(String question, String topic) {
        String prompt = String.format(
                "Answer strictly YES or NO.\nTopic: %s\nQuestion: %s", topic, question);

        GenerateContentResponse response =
                client.models.generateContent("gemini-2.5-flash", prompt, null);

        String out = response.text().trim();
        return out.equalsIgnoreCase("YES");
    }
}
