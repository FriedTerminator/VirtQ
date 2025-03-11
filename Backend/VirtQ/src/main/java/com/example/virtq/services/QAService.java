package com.example.virtq.services;

import com.example.virtq.domain.QA;
import com.example.virtq.domain.User;
import com.example.virtq.exceptions.QADoesNotExistException;
import com.example.virtq.exceptions.QAIdException;
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

    public QA saveQA(QA qa, String username) {
        try {
            User user = userRepository.findByUsername(username);
            qa.setUser(user);
            qa.setQaLeader(user.getUsername());
            qa.setQaIdentifier(qa.getQaIdentifier().toUpperCase());

            if(qa.getId() == null) {

            }

            return qaRepository.save(qa);

        } catch (Exception e) {
            throw new QAIdException("Q&A with ID: '" + qa.getQaIdentifier() + "' already exists");
        }
    }

    public QA findByQAIdentifier(String qaId, String username){
        QA qa = qaRepository.findByQaIdentifier(qaId);

        if(qa == null) {
            throw new QADoesNotExistException("The Q&A '" + qaId + "' does not exist");
        }

        if(!qa.getQaLeader().equals(username)) {
            throw new QANotFoundException("Q&A not found in your account");
        }

        return qa;
    }

    public Iterable<QA> findAllQAs(String username) {
        return qaRepository.findAllByQaLeader(username);
    }

    public void deleteQA(String qaId, String username) {
        qaRepository.delete(findByQAIdentifier(qaId, username));
    }
}
