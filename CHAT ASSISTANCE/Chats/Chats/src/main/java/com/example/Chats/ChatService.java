package com.example.Chats;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private OllamaService ollamaService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String processQuery(String question) {
        String sql = ollamaService.generateSQLFromQuestion(question);
        System.out.println("Generated SQL: " + sql);  // DEBUG
    
        try {
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
            return formatResult(rows);
        } catch (Exception e) {
            e.printStackTrace();  // DEBUG
            return "Sorry, I couldn't understand your question or the query failed.";
        }
    }
    

    private String formatResult(List<Map<String, Object>> rows) {
        if (rows.isEmpty()) return "No data found.";
        StringBuilder sb = new StringBuilder();
        for (Map<String, Object> row : rows) {
            row.forEach((k, v) -> sb.append(k).append(": ").append(v).append(" | "));
            sb.append("\n");
        }
        return sb.toString();
    }
}
