package com.example.virtq.repositories;

import com.example.virtq.domain.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {
    User findByUsername(String username);

    User getById(Long id);
}