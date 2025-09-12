package com.ikaros.bball.security.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthRequest(
        @NotBlank String username,
        @NotBlank String password,
        String name
) {}
