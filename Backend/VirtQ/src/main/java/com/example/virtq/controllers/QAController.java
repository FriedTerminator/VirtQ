package com.example.virtq.controllers;

import com.example.virtq.domain.QA;
import com.example.virtq.services.QAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/qa")
public class QAController {

    @Autowired
    private QAService qaService;

    @GetMapping("{qaId}")
    public ResponseEntity<?> getQAById(@PathVariable String qaId) {
        QA qa = qaService.findByQAIdentifier(qaId);

        return new ResponseEntity<QA>(qa, HttpStatus.OK);
    }
}
