package com.basketballteam.basketball_app.news;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;

@Entity
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String imageUrl;
    private Instant publishedAt = Instant.now();

    public News() {}

    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getTitle(){return title;} public void setTitle(String t){this.title=t;}
    public String getContent(){return content;} public void setContent(String c){this.content=c;}
    public String getImageUrl(){return imageUrl;} public void setImageUrl(String i){this.imageUrl=i;}
    public Instant getPublishedAt(){return publishedAt;} public void setPublishedAt(Instant p){this.publishedAt=p;}
}
