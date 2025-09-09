package com.example.virtq.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class GeminiService {

    // Use a descriptive field name so the accessor is r.related()
    public record ClassificationResult(boolean related, Double score, String reason) {}
    public record ModerationResult(boolean blocked, String category, String severity, String reason) {}

    private final Client client;
    private final ObjectMapper mapper = new ObjectMapper();

    public GeminiService(Client client) {
        this.client = client;
    }

    public boolean isQuestionRelated(String questionText, String topicScope) {
        return isQuestionRelatedWithScore(questionText, topicScope).related();
    }

    public ClassificationResult isQuestionRelatedWithScore(String questionText, String topicScope) {
        String prompt = REL_PROMPT.formatted(topicScope, questionText);
        try {
            GenerateContentConfig cfg = GenerateContentConfig.builder()
                    .temperature(0.1F)
                    .topP(0.1F)
                    .topK((float) 32)
                    .candidateCount(1)
                    .responseMimeType("application/json")
                    .build();

            GenerateContentResponse response = client.models.generateContent("gemini-2.0-flash", prompt, cfg);

            String out = cleanup(response.text());
            JsonNode j = mapper.readTree(out);

            boolean related = j.path("related").asBoolean(false);
            Double score = j.has("score") && !j.get("score").isNull()
                    ? j.get("score").asDouble() : null;
            if(score != null) score = Math.max(0.0, Math.min(1.0, score));
            String reason = j.path("reason").asText("");

            return new ClassificationResult(related, score, reason.isBlank() ? (related ? "OK" : "Off-topic") : reason);
        } catch(Exception e) {
            return new ClassificationResult(false, 0.0, "Classifier error");
        }
    }

    public ModerationResult moderateText(String text) {
        String prompt = MOD_PROMPT.formatted(text);
        try {
            GenerateContentConfig cfg = GenerateContentConfig.builder()
                    .temperature(0.1F)
                    .responseMimeType("application/json")
                    .build();

            GenerateContentResponse resp =
                    client.models.generateContent("gemini-2.0-flash", prompt, cfg);

            String out = cleanup(resp.text());
            JsonNode j = mapper.readTree(out);

            boolean blocked = j.path("blocked").asBoolean(false);
            String category = j.path("category").asText("none");
            String severity = j.path("severity").asText("low");
            String reason = j.path("reason").asText("");

            return new ModerationResult(blocked, category, severity, reason);

        } catch (Exception e) {
            // Be conservative on failures
            return new ModerationResult(true, "other", "high", "Moderator failed");
        }
    }

    private static final Set<String> PROFANITY = Set.of(
            "fuck","shit","bitch","asshole","cunt","dick","pussy","bastard"
    );

    public static boolean containsProfanity(String text) {
        String n = normalize(text);
        for(String word : PROFANITY) {
            if(n.matches("(?s).*\\b" + java.util.regex.Pattern.quote(word) + "\\b.*")) return true;
        }
        return false;
    }

    private static String cleanup(String output) {
        String o = output == null ? "" : output.trim();
        if (o.startsWith("```")) {
            o = o.replaceAll("^```(?:json)?\\s*", "")
                    .replaceAll("\\s*```\\s*$", "")
                    .trim();
        }
        return o;
    }

    private static String normalize(String s){
        return (" " + s.toLowerCase()
                .replace('0','o').replace('1','i').replace('3','e')
                .replace('@','a').replace('$','s').replace('!','i'))
                .replaceAll("\\s+"," ") + " ";
    }

    private static final String REL_PROMPT = """
        You are a STRICT topic relevance classifier.

        Return ONLY JSON:
        { "related": true|false, "score": 0..1, "reason": "<short>" }

        Rules:
        - related=true ONLY if the QUESTION is clearly about the TOPIC scope.
        - If ambiguous or partially related, set related=false.
        - Prefer precision over recall (avoid false positives).
        - Score = confidence that the question is in-scope.

        TOPIC SCOPE:
        %s

        FORMAT STRICTNESS:
        - Output JSON only. No prose, no code fences.

        QUESTION:
        %s
        """;

    private static final String MOD_PROMPT = """
        You are a strict JSON-only moderator. Block vulgarity, sexual content, hate/harassment,
        threats, self-harm, or graphic violence.

        Return ONLY JSON:
        {
          "blocked": true|false,
          "category": "<sexual|vulgarity|hate|harassment|violence|self-harm|other|none>",
          "severity": "<low|medium|high>",
          "reason": "<short>"
        }

        TEXT:
        %s
        """;
}
