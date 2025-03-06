package com.example.virtq.repositories;

import com.example.virtq.domain.QA;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QARepository extends CrudRepository<QA, Long> {

    QA findByQAIdentifier(String qaIdentifier);

    Iterable<QA> findAll();

    Iterable<QA> findAllByQALeader(String username);
}
