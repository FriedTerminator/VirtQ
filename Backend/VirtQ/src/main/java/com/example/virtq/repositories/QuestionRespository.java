package com.example.virtq.repositories;

import com.example.virtq.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRespository extends JpaRepository<Question, Long> {

    List<Question> findByQAId(Long qaId);
}
