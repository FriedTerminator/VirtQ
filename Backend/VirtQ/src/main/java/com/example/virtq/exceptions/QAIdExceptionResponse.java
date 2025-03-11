package com.example.virtq.exceptions;

public class QAIdExceptionResponse {
    private String qaIdAlreadyExists;

    public QAIdExceptionResponse(String qaIdAlreadyExists) {
        this.qaIdAlreadyExists = qaIdAlreadyExists;
    }

    public String getQaIdAlreadyExists() {
        return qaIdAlreadyExists;
    }

    public void setQaIdAlreadyExists(String qaIdAlreadyExists) {
        this.qaIdAlreadyExists = qaIdAlreadyExists;
    }
}
