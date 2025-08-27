package com.basketballteam.basketball_app.exception;

import com.basketballteam.basketball_app.exception.AppException;
import org.springframework.http.HttpStatus;

public class NotFoundException extends AppException {
    public NotFoundException(String resource, Object id) {
        super
                (HttpStatus.NOT_FOUND, "NOT_FOUND" , resource + " with id " + id + " not found");
    }
    public NotFoundException(String message) {
        super
                (HttpStatus.NOT_FOUND, "NOT_FOUND" , message);
    }
}

