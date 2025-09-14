package com.ikaros.bball.news;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    boolean existsByTitleIgnoreCase(String title);
    List<News> findAllByOrderByPublishedAtDesc(Pageable pageable);
}
