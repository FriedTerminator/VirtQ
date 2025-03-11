package com.example.virtq.controllers;

import com.example.virtq.domain.QA;
import com.example.virtq.services.QAService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/qa")
public class QAController {

    @Autowired
    private QAService qaService;

    @PostMapping("")
    public ResponseEntity<?> createNewQA(@Valid @RequestBody QA qa, BindingResult result, Principal principal) {
        QA qa1 = qaService.saveQA(qa, principal.getName());
        return new ResponseEntity<QA>(qa1, HttpStatus.CREATED);
    }

    @GetMapping("/{qaId}")
    public ResponseEntity<?> getQAById(@PathVariable String qaId, Principal principal) {
        QA qa = qaService.findByQAIdentifier(qaId, principal.getName());

        return new ResponseEntity<QA>(qa, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<QA> getAllQAs(Principal principal) {
        return qaService.findAllQAs(principal.getName());
    }

    @DeleteMapping("/{qaId}")
    public ResponseEntity<?> deleteQA(@PathVariable String qaId, Principal principal) {
        qaService.deleteQA(qaId, principal.getName());
        return new ResponseEntity<String>("Q&A with ID: '" + qaId + "' was deleted", HttpStatus.OK);
    }
}
