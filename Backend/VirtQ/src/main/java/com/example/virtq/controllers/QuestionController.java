package com.example.virtq.controllers;

import com.example.virtq.config.QuestionWebSocketHandler;
import com.example.virtq.domain.QA;
import com.example.virtq.domain.Question;
import com.example.virtq.services.GeminiService;
import com.example.virtq.services.MapValidationErrorService;
import com.example.virtq.services.QAService;
import com.example.virtq.services.QuestionService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("api/questions")
public class QuestionController {
    private final GeminiService geminiService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private QuestionWebSocketHandler questionWebSocketHandler;

    @Autowired
    private final QuestionService questionService;

    @Autowired
    private final QAService qaService;

    public QuestionController(GeminiService geminiService, QuestionService questionService, QAService qaService) {
        this.geminiService = geminiService;
        this.questionService = questionService;
        this.qaService = qaService;
    }

    @PostMapping("/{qaIdentifier}")
    public ResponseEntity<?> createQuestion(@PathVariable String qaIdentifier,
                                            @RequestBody Question question,
                                            BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        QA qa = qaService.findByQaIdentifierQuestion(qaIdentifier.toUpperCase());
        if (qa == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Q&A session not found");
        }

        String topicScope = buildTopicScope(qa);

        // 1) quick profanity prefilter
        if (GeminiService.containsProfanity(question.getText())) {
            return ResponseEntity.unprocessableEntity().body("Question rejected (inappropriate language).");
        }

        // 2) LLM moderation
        GeminiService.ModerationResult mod = geminiService.moderateText(question.getText());
        if (mod.blocked()) {
            return ResponseEntity.unprocessableEntity().body("Rejected by moderation: " + mod.reason());
        }

        // 3) Relevance check
        GeminiService.ClassificationResult rel =
                geminiService.isQuestionRelatedWithScore(question.getText(), topicScope);

        double THRESH = 0.65;
        boolean pass = rel.related() && (rel.score() == null || rel.score() >= THRESH);
        if (!pass) {
            return ResponseEntity.unprocessableEntity().body(
                    "Off-topic for this session" + (rel.reason() == null || rel.reason().isBlank() ? "" : (": " + rel.reason()))
            );
        }

        // Passed all gates → save & broadcast
        Question savedQuestion = questionService.saveQuestion(qa, question);
        questionWebSocketHandler.sendNewQuestion(savedQuestion);
        return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
    }

    @GetMapping("/qa/{qaIdentifier}")
    public ResponseEntity<List<Question>> getQuestionsByQA(@PathVariable String qaIdentifier) {
        QA qa = qaService.findByQaIdentifierQuestion(qaIdentifier);
        if (qa == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(questionService.getQuestionsByQAId(qa.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long id) {
        Question question = questionService.getQuestionById(id);
        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @PutMapping("/{qaIdentifier}/{id}/approve")
    public ResponseEntity<?> approveQuestion(@PathVariable String qaIdentifier,
                                             @PathVariable Long id) {
        QA qa = qaService.findByQaIdentifierQuestion(qaIdentifier);
        if (qa == null) {
            return new ResponseEntity<>("Q&A session not found", HttpStatus.BAD_REQUEST);
        }

        Question question = questionService.getQuestionById(id);
        question.setApproved(true);
        questionService.saveQuestion(qa, question);
        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @GetMapping("/passcode/{passcode}")
    public ResponseEntity<?> getQAByPasscode(@PathVariable String passcode) {
        QA qa = qaService.findByPasscode(passcode);
        if (qa == null) {
            return new ResponseEntity<>("Invalid passcode", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(qa, HttpStatus.OK);
    }

    @GetMapping("/qa/{qaIdentifier}/admin")
    public ResponseEntity<List<Question>> getQuestionsForAdmin(@PathVariable String qaIdentifier) {
        QA qa = qaService.findByQaIdentifierQuestion(qaIdentifier);
        if (qa == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(questionService.getQuestionsByQAId(qa.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return new ResponseEntity<>("Question with ID: '" + id + "' was deleted", HttpStatus.OK);
    }

    @PostMapping("/{qaIdentifier}/check")
    public ResponseEntity<QuestionCheckResponse> checkQuestion(@PathVariable String qaIdentifier,
                                                               @RequestBody @Valid QuestionCheckRequest request,
                                                               BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return (ResponseEntity<QuestionCheckResponse>) errorMap;

        QA qa = qaService.findByQaIdentifierQuestion(qaIdentifier);
        if (qa == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String topic = Stream.of(qa.getName(), qa.getDescription())
                .filter(s -> s != null && !s.isBlank())
                .collect(Collectors.joining("-"));

        GeminiService.ClassificationResult res =
                geminiService.isQuestionRelatedWithScore(request.getText(), topic);

        return ResponseEntity.ok(new QuestionCheckResponse(res.related(), res.score(), res.reason()));
    }

    public static class QuestionCheckRequest {
        @NotBlank(message = "Question text is required")
        private String text;
        private String topicOverride;

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        public String getTopicOverride() { return topicOverride; }
        public void setTopicOverride(String topicOverride) { this.topicOverride = topicOverride; }
    }

    private static String buildTopicScope(QA qa) {
        // Combine name + description for a rich topic scope
        String scope = Stream.of(qa.getName(), qa.getDescription())
                .filter(s -> s != null && !s.isBlank())
                .reduce((a, b) -> a + " — " + b)
                .orElse(qa.getName() == null ? "" : qa.getName());

        // You can add more fields here later (e.g., allowed keywords)
        return scope;
    }

    public static class QuestionCheckResponse {
        private boolean related;
        private Double score;
        private String reason;

        public QuestionCheckResponse(boolean related) { this.related = related; }
        public QuestionCheckResponse(boolean related, Double score, String reason) {
            this.related = related; this.score = score; this.reason = reason;
        }

        public boolean isRelated() { return related; }
        public void setRelated(boolean related) { this.related = related; }
        public Double getScore() { return score; }
        public void setScore(Double score) { this.score = score; }
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }
}
