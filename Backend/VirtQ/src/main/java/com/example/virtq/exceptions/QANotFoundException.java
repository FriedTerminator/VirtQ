package com.example.virtq.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class QANotFoundException extends RuntimeException {
    public QANotFoundException(String message) {
        super(message);
    }
}
