package com.example.virtq.exceptions;

public class QADoesNotExistExceptionResponse {
    private String qaDoesNotExist;

    public QADoesNotExistExceptionResponse(String qaDoesNotExist) {
        this.qaDoesNotExist = qaDoesNotExist;
    }

    public String getQaDoesNotExist() {
        return qaDoesNotExist;
    }

    public void setQaDoesNotExist(String qaDoesNotExist) {
        this.qaDoesNotExist = qaDoesNotExist;
    }
}
