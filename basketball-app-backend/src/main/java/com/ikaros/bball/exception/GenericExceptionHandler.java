package com.ikaros.bball.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.List;

@RestControllerAdvice
public class GenericExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiError> handleApp(AppException ex, HttpServletRequest req) {
        ApiError body = new ApiError();
        body.status = ex.getStatus().value();
        body.error  = ex.getStatus().getReasonPhrase();
        body.code   = ex.getCode();
        body.message = ex.getMessage();
        body.path   = req.getRequestURI();
        body.details = ex.getDetails();
        return ResponseEntity.status(ex.getStatus()).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest req) {
        ApiError body = new ApiError();
        body.status = HttpStatus.BAD_REQUEST.value();
        body.error = HttpStatus.BAD_REQUEST.getReasonPhrase();
        body.code = "VALIDATION_ERROR";
        body.message = "One or more fields are invalid.";
        body.path = req.getRequestURI();
        List<ApiError.FieldErrorItem> items = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> new ApiError.FieldErrorItem(
                        fe.getField(),
                        (fe.getDefaultMessage() != null ? fe.getDefaultMessage() : "Invalid value")))
                .toList();
        body.fieldErrors = items;
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiError> handleConstraint(ConstraintViolationException ex, HttpServletRequest req) {
        ApiError body = new ApiError();
        body.status = HttpStatus.BAD_REQUEST.value();
        body.error = HttpStatus.BAD_REQUEST.getReasonPhrase();
        body.code = "CONSTRAINT_VIOLATION";
        body.message = "Invalid request.";
        body.path = req.getRequestURI();
        body.fieldErrors = ex.getConstraintViolations().stream()
                .map(v -> new ApiError.FieldErrorItem(v.getPropertyPath().toString(), v.getMessage()))
                .toList();
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> handleDataIntegrity(DataIntegrityViolationException ex, HttpServletRequest req) {
        ApiError body = new ApiError();
        body.status = HttpStatus.CONFLICT.value();
        body.error = HttpStatus.CONFLICT.getReasonPhrase();
        body.code = "DATA_INTEGRITY_VIOLATION";
        body.message = "Operation conflicts with database constraints.";
        body.path = req.getRequestURI();
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> handleBadJson(HttpMessageNotReadableException ex, HttpServletRequest req) {
        ApiError body = new ApiError();
        body.status = HttpStatus.BAD_REQUEST.value();
        body.error  = HttpStatus.BAD_REQUEST.getReasonPhrase();
        body.code   = "MALFORMED_JSON";
        body.message = "Malformed request body.";
        body.path   = req.getRequestURI();
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ApiError> handleNoHandler(NoHandlerFoundException ex, HttpServletRequest req) {
        ApiError body = new ApiError();
        body.status = HttpStatus.NOT_FOUND.value();
        body.error  = HttpStatus.NOT_FOUND.getReasonPhrase();
        body.code   = "ENDPOINT_NOT_FOUND";
        body.message = "No endpoint " + ex.getHttpMethod() + " " + ex.getRequestURL();
        body.path   = req.getRequestURI();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleOther(Exception ex, HttpServletRequest req) {
        ApiError body = new ApiError();
        body.status = HttpStatus.INTERNAL_SERVER_ERROR.value();
        body.error  = HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase();
        body.code   = "UNEXPECTED_ERROR";
        body.message = "Something went wrong.";
        body.path   = req.getRequestURI();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
