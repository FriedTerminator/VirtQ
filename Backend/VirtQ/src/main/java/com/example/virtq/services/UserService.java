package com.example.virtq.services;

import com.example.virtq.domain.User;
import com.example.virtq.repositories.UserRepository;
import com.example.virtq.security.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User saveUser(User newUser) {

    }
}
