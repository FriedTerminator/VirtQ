package com.example.virtq.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    // Use a descriptive field name so the accessor is r.related()
    public record ClassificationResult(boolean related, Double score, String reason) {}

    private final Client client;
    private final ObjectMapper mapper = new ObjectMapper();

    public GeminiService(Client client) {
        this.client = client;
    }

    /** Boolean convenience wrapper */
    public boolean isQuestionRelated(String questionText, String topic) {
        ClassificationResult r = isQuestionRelatedWithScore(questionText, topic);
        return r.related();
    }

    /** Full result with score + reason */
    public ClassificationResult isQuestionRelatedWithScore(String questionText, String topic) {
        String prompt = """
            You are a strict JSON-only classifier.
            Respond ONLY in valid JSON with this exact structure:
            { "related": true|false, "score": 0..1, "reason": "<short>" }

            TOPIC: %s
            QUESTION: %s
            """.formatted(topic, questionText);

        try {
            GenerateContentResponse response =
                    client.models.generateContent("gemini-2.0-flash", prompt, null);

            String output = response.text().trim();

            // Strip accidental code fences if the model adds them
            if (output.startsWith("```")) {
                output = output.replaceAll("^```(?:json)?\\s*", "")
                        .replaceAll("\\s*```\\s*$", "")
                        .trim();
            }

            JsonNode json = mapper.readTree(output);

            boolean related = json.path("related").asBoolean(false);

            Double score = json.has("score") && !json.get("score").isNull()
                    ? json.get("score").asDouble()
                    : null;

            // Clamp score to [0,1] if present (defensive)
            if (score != null) {
                score = Math.max(0.0, Math.min(1.0, score));
            }

            String reason = json.has("reason") && !json.get("reason").isNull()
                    ? json.get("reason").asText()
                    : "";

            return new ClassificationResult(related, score, reason);

        } catch (Exception e) {
            // In production, log this with a logger
            return new ClassificationResult(false, 0.0, "Classification failed: " + e.getMessage());
        }
    }
}
