package com.example.virtq.exceptions;

public class QANotFoundExceptionResponse {
    private String qaNotFound;

    public QANotFoundExceptionResponse(String qaNotFound) {
        this.qaNotFound = qaNotFound;
    }

    public String getQaNotFound() {
        return qaNotFound;
    }

    public void setQaNotFound(String qaNotFound) {
        this.qaNotFound = qaNotFound;
    }
}
