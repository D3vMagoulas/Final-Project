package com.ikaros.bball.dto.news;

import com.ikaros.bball.news.News;

public final class NewsMapper {
    private NewsMapper(){}

    public static NewsDto toDto(News n){
        return new NewsDto(
                n.getId(),
                n.getTitle(),
                n.getContent(),
                n.getImageUrl(),
                n.getAttachmentUrls(),
                n.getPublishedAt()
        );
    }

    public static News fromCreate(NewsCreationDto d){
        News n = new News();
        n.setTitle(d.title());
        n.setContent(d.content());
        if (d.attachmentUrls() != null) n.setAttachmentUrls(d.attachmentUrls());
        if (d.publishedAt() != null) n.setPublishedAt(d.publishedAt());
        return n;
    }

    public static void applyUpdate(NewsUpdateDto d, News n){
        if (d.title() != null)       n.setTitle(d.title());
        if (d.content() != null)     n.setContent(d.content());
        if (d.imageUrl() != null)    n.setImageUrl(d.imageUrl());
        if (d.attachmentUrls() != null) n.setAttachmentUrls(d.attachmentUrls());
        if (d.publishedAt() != null) n.setPublishedAt(d.publishedAt());
    }
}