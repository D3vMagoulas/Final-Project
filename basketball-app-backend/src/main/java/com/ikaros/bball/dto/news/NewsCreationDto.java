package com.ikaros.bball.dto.news;

import jakarta.validation.constraints.NotBlank;
import java.time.Instant;

public record NewsCreationDto(
        @NotBlank String title,
        @NotBlank String content,
        Instant publishedAt   // optional; if null we'll set now()
) {}
