package com.ikaros.bball.dto.news;

import java.time.Instant;
import java.util.List;

public record NewsUpdateDto(
        String title,
        String content,
        String imageUrl,
        List<String> attachmentUrls,
        Instant publishedAt
) {}