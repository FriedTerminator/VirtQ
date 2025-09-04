package com.example.virtq.controllers;

import com.example.virtq.config.QuestionWebSocketHandler;
import com.example.virtq.domain.QA;
import com.example.virtq.domain.Question;
import com.example.virtq.services.GeminiService;
import com.example.virtq.services.MapValidationErrorService;
import com.example.virtq.services.QAService;
import com.example.virtq.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/check")
    public ResponseEntity<?> checkQuestion(@RequestBody QuestionCheckRequest request) {
        boolean isRelated = geminiService.isQuestionRelated(request.getQuestion(), request.getTopic());

        return ResponseEntity.ok(new QuestionCheckResponse(isRelated));
    }

    public static class QuestionCheckRequest {
        private String question;
        private String topic;
    }
}
