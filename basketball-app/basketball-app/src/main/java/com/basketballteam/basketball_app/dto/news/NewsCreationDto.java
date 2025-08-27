package com.basketballteam.basketball_app.dto.news;

import jakarta.validation.constraints.NotBlank;
import java.time.Instant;

public record NewsCreationDto(
        @NotBlank String title,
        @NotBlank String content,
        String imageUrl,
        Instant publishedAt   // optional; if null we'll set now()
) {}
