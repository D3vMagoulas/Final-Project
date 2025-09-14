package com.ikaros.bball.exception;

import org.springframework.http.HttpStatus;

public class BadRequestException extends AppException {
    public BadRequestException(String message) {
        super
                (HttpStatus.BAD_REQUEST, "BAD_REQUEST", message);
    }
}
