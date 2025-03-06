package com.example.virtq.exceptions;

public class QADoesNotExistExceptionResponse {
    private String qaDoesNotExist;

    public QADoesNotExistExceptionResponse(String qaDoesNotExist) {
        this.qaDoesNotExist = qaDoesNotExist;
    }

    public String getQaNotFound() {
        return qaDoesNotExist;
    }

    public void setQaNotFound(String qaDoesNotExist) {
        this.qaDoesNotExist = qaDoesNotExist;
    }
}
