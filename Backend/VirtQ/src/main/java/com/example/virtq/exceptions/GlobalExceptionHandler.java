package com.example.virtq.exceptions;

import com.example.virtq.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.validation.BindingResult;

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

        // Reuse your existing MapValidationErrorService to transform errors into a JSON map
        ResponseEntity<?> errorResponse = mapValidationErrorService.MapValidationService(bindingResult);

        // If there are errors, it returns a 400 with the error map.
        // If errorResponse is null, there's no error (rare in this scenario).
        // Typically you'd return errorResponse as is:
        return errorResponse != null ? errorResponse : ResponseEntity.ok("No validation errors");
    }

    /**
     * Example: handle any other exceptions you want in a uniform way.
     * This is optional and just for demonstration.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalExceptions(Exception ex) {
        // Log or return a generic error response
        // You might create a custom error body with a message/timestamp/etc.
        return ResponseEntity.internalServerError().body("An unexpected error occurred.");
    }
}