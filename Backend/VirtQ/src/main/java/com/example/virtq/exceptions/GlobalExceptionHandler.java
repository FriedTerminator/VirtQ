package com.example.virtq.exceptions;

import com.example.virtq.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.validation.BindingResult;

@RestController
@RestControllerAdvice
public class GlobalExceptionHandler {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    /**
     * Handles all validation errors thrown by @Valid,
     * which triggers a MethodArgumentNotValidException when input is invalid.
     */
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
}