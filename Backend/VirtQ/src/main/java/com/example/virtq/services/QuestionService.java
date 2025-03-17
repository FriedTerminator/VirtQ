package com.example.virtq.services;

import com.example.virtq.domain.Question;
import com.example.virtq.exceptions.QuestionNotFoundException;
import com.example.virtq.repositories.QuestionRespository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    private final QuestionRespository questionRespository;

    public QuestionService(QuestionRespository questionRespository) {
        this.questionRespository = questionRespository;
    }

    public Question saveQuestion(Question question) {
        return questionRespository.save(question);
    }

    public List<Question> getQuestionsByQAId(Long qaId) {
        return questionRespository.findByQAId(qaId);
    }

    public Question getQuestionById(Long id) {
        return questionRespository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException("Question with ID: '" + id + "' not found"));
    }

    public void deleteQuestion(Long id) {
        questionRespository.deleteById(id);
    }
}
