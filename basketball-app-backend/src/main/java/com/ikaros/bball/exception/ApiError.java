package com.ikaros.bball.exception;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public class ApiError  {
    public Instant timestamp = Instant.now();
    public int status;
    public String error;
    public String code;
    public String message;
    public String path;
    public Map<String, Object> details;
    public List<FieldErrorItem> fieldErrors;

    public static class FieldErrorItem {
        public String field;
        public String message;
        public FieldErrorItem(String field, String message) {
            this.field = field; this.message = message;
        }
    }
}

