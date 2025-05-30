package com.example.virtq.services;

import com.example.virtq.config.QuestionWebSocketHandler;
import com.example.virtq.domain.QA;
import com.example.virtq.domain.Question;
import com.example.virtq.exceptions.QANotFoundException;
import com.example.virtq.exceptions.QuestionNotFoundException;
import com.example.virtq.repositories.QARepository;
import com.example.virtq.repositories.QuestionRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    private final QuestionRespository questionRespository;

    @Autowired
    private QARepository qaRepository;

    private final QuestionWebSocketHandler questionWebSocketHandler;

    public QuestionService(QuestionRespository questionRespository, QARepository qaRepository, QuestionWebSocketHandler questionWebSocketHandler) {
        this.questionRespository = questionRespository;
        this.qaRepository = qaRepository;
        this.questionWebSocketHandler = questionWebSocketHandler;
    }

    public Question saveQuestion(QA qaId, Question question) {
        QA qa = qaRepository.findByQaIdentifier(String.valueOf(qaId));

        if(qa == null) {
            throw new QANotFoundException("Q&A session not found");
        }

        question.setQa(qa);

        Question savedQuestion = questionRespository.save(question);

        questionWebSocketHandler.sendNewQuestion(savedQuestion);

        return savedQuestion;
    }

    public List<Question> getQuestionsByQAId(Long qaId) {
        return questionRespository.findByQaId(qaId);
    }

    public Question getQuestionById(Long id) {
        return questionRespository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException("Question with ID: '" + id + "' not found"));
    }

    public void deleteQuestion(Long id) {
        questionRespository.deleteById(id);
    }
}
