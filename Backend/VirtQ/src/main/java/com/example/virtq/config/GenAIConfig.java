package com.example.virtq.config;

import com.google.genai.Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GenAIConfig {

    @Bean
    public Client genaiClient(@Value("${genai.api-key:}") String configuredKey) {
        String apiKey = (configuredKey != null && !configuredKey.isBlank())
                ? configuredKey
                : System.getenv("GOOGLE_API_KEY");

        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException(
                    "Missing Gemini API key. Set genai.api-key in application.properties " +
                            "or define environment variable GOOGLE_API_KEY."
            );
        }

        return Client.builder().apiKey(apiKey).build();
    }
}
