package com.example.virtq.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class QADoesNotExistException extends RuntimeException {
    public QADoesNotExistException(String message) {
        super(message);
    }
}
