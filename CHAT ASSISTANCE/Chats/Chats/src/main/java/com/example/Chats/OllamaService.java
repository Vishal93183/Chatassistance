package com.example.Chats;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class OllamaService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String OLLAMA_URL = "http://localhost:11434/api/generate";

    public String generateSQLFromQuestion(String question) {
        String prompt = """
            You are an intelligent SQL assistant.
            Convert the following natural language question into a valid MySQL query.
            Only use the following table schema:
    
            Table: employee
            - id INT
            - name VARCHAR(100)
            - category CHAR(1)
            - salary DECIMAL(10,2)
            - joining_date DATE
            - retirement_date DATE
            - phone_number BIGINT
    
            Instructions:
            - Only use columns listed above.
            - Use MySQL syntax.
            - Do not include explanations or extra words.
            - Only return the SQL query.
    
            Question: %s
            SQL:""".formatted(question);
    
        Map<String, Object> body = new HashMap<>();
        body.put("model", "llama3");
        body.put("prompt", prompt);
        body.put("stream", false);
    
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
    
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
    
        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(OLLAMA_URL, entity, Map.class);
    
            if (response.getBody() == null || !response.getBody().containsKey("response")) {
                return "SELECT 1"; // fallback query or error indicator
            }
    
            String rawSQL = response.getBody().get("response").toString().trim();
            System.out.println("Generated SQL: " + rawSQL); // for debugging
            return rawSQL;
    
        } catch (RestClientException e) {
            e.printStackTrace();
            return "SELECT 1";
        }
    }
}    