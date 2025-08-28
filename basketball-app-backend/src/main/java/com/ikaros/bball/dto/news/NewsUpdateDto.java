package com.ikaros.bball.dto.news;

import java.time.Instant;

public record NewsUpdateDto(
        String title,
        String content,
        String imageUrl,
        Instant publishedAt
) {}
