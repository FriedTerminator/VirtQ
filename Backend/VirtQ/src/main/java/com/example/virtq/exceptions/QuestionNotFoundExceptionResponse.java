package com.example.virtq.exceptions;

public class QuestionNotFoundExceptionResponse {
    private String questionNotFound;

    public QuestionNotFoundExceptionResponse(String questionNotFound) {
        this.questionNotFound = questionNotFound;
    }

    public String getQuestionNotFound() {
        return questionNotFound;
    }

    public void setQuestionNotFound(String questionNotFound) {
        this.questionNotFound = questionNotFound;
    }
}
