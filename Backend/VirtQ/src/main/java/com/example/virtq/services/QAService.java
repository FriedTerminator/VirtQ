package com.example.virtq.services;

import com.example.virtq.domain.QA;
import com.example.virtq.exceptions.QADoesNotExistException;
import com.example.virtq.exceptions.QANotFoundException;
import com.example.virtq.repositories.QARepository;
import com.example.virtq.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QAService {

    @Autowired
    private QARepository qaRepository;

    @Autowired
    private UserRepository userRepository;

    public QA findByQAIdentifier(String qaId, String username){
        QA qa = qaRepository.findByQAIdentifier(qaId);

        if(qa == null) {
            throw new QADoesNotExistException("The Q&A '" + qaId + "' does not exist");
        }

        if(!qa.getQaLeader().equals(username)) {
            throw new QANotFoundException("Q&A not found in your account");
        }

        return qa;
    }

    public Iterable<QA> findAllQAs(String username) {
        return qaRepository.findAllByQALeader(username);
    }

    public void deleteQA(String qaId, String username) {
        qaRepository.delete(findByQAIdentifier(qaId, username));
    }
}
