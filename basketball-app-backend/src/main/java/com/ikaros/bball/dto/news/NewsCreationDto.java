package com.ikaros.bball.dto.news;

import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.List;

public record NewsCreationDto(
        @NotBlank String title,
        @NotBlank String content,
        List<String> attachmentUrls,
        Instant publishedAt   // optional; if null we'll set now()
) {}