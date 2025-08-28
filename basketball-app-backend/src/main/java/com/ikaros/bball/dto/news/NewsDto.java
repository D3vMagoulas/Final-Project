package com.ikaros.bball.dto.news;

import java.time.Instant;

public record NewsDto(
        Long id,
        String title,
        String content,
        String imageUrl,
        Instant publishedAt
) {}


