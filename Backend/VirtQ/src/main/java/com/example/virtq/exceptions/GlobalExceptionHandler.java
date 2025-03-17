package com.example.virtq.exceptions;

import com.example.virtq.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.validation.BindingResult;
import org.springframework.web.context.request.WebRequest;

@RestController
@RestControllerAdvice
public class GlobalExceptionHandler {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException ex) {
        BindingResult bindingResult = ex.getBindingResult();
        ResponseEntity<?> errorResponse = mapValidationErrorService.MapValidationService(bindingResult);

        return errorResponse != null ? errorResponse : ResponseEntity.ok("No validation errors");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalExceptions(Exception ex) {
        return ResponseEntity.internalServerError().body("An unexpected error occurred.");
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameException(UsernameAlreadyExistsException ex, WebRequest request) {
        UsernameAlreadyExistsExceptionResponse exceptionResponse = new UsernameAlreadyExistsExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleQADoesNotExistException(QADoesNotExistException ex, WebRequest request){
        QADoesNotExistExceptionResponse exceptionResponse = new QADoesNotExistExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleQANotFoundException(QANotFoundException ex, WebRequest request){
        QANotFoundExceptionResponse exceptionResponse = new QANotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleQANotFoundException(QAIdException ex, WebRequest request){
        QAIdExceptionResponse exceptionResponse = new QAIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleQuestionNotFoundException(QAIdException ex, WebRequest request){
        QuestionNotFoundExceptionResponse exceptionResponse = new QuestionNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}