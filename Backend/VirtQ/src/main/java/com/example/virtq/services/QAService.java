package com.example.virtq.services;

import com.example.virtq.domain.QA;
import com.example.virtq.repositories.QARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QAService {

    @Autowired
    private QARepository qaRepository;

    public QA findByQAIdentifier(String qaId){
        QA qa = qaRepository.findByQAIdentifier(qaId);

        return qa;
    }

    public Iterable<QA> findAllQAs(String username) {
        return qaRepository.findAll();
    }
}
