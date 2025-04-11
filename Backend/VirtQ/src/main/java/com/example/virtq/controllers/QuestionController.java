package com.example.virtq.controllers;

import com.example.virtq.domain.QA;
import com.example.virtq.domain.Question;
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

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private final QuestionService questionService;

    @Autowired
    private final QAService qaService;

    public QuestionController(QuestionService questionService, QAService qaService) {
        this.questionService = questionService;
        this.qaService = qaService;
    }

    @PostMapping("/{qaId}")
    public ResponseEntity<?> createQuestion(@PathVariable QA qaId, @RequestBody Question question, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Question savedQuestion = questionService.saveQuestion(qaId, question);
        return new ResponseEntity<Question>(savedQuestion, HttpStatus.CREATED);
    }

    @GetMapping("/qa/{qaId}")
    public ResponseEntity<List<Question>> getQuestionsByQA(@PathVariable Long qaId) {
        return ResponseEntity.ok(questionService.getQuestionsByQAId(qaId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long id) {
        Question question = questionService.getQuestionById(id);
        return new ResponseEntity<Question>(question, HttpStatus.OK);
    }

    @PutMapping("/{qaId}/{id}/approve")
    public ResponseEntity<?> approveQuestion(@PathVariable QA qaId, @PathVariable Long id) {
        Question question = questionService.getQuestionById(id);
        question.setApproved(true);
        questionService.saveQuestion(qaId, question);
        return new ResponseEntity<Question>(question, HttpStatus.OK);
    }

    @GetMapping("/passcode/{passcode}")
    public ResponseEntity<?> getQAByPasscode(@PathVariable String passcode) {
        QA qa = qaService.findByPasscode(passcode);

        return new ResponseEntity<>(qa, HttpStatus.OK);
    }

    @GetMapping("/qa/{qaId}/admin")
    public ResponseEntity<List<Question>> getQuestionsForAdmin(@PathVariable Long qaId) {
        return ResponseEntity.ok(questionService.getQuestionsByQAId(qaId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return new ResponseEntity<String>("Question with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
