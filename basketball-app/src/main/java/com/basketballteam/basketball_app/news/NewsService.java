package com.basketballteam.basketball_app.news;

import com.basketballteam.basketball_app.dto.news.NewsCreationDto;
import com.basketballteam.basketball_app.dto.news.NewsMapper;
import com.basketballteam.basketball_app.dto.news.NewsUpdateDto;
import com.basketballteam.basketball_app.exception.NotFoundException;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class NewsService {

    private final NewsRepository repo;

    public NewsService(NewsRepository repo) {
        this.repo = repo;
    }

    public Page<News> list(Pageable pageable) {
        return repo.findAll(pageable);
    }

    public List<News> latest(int size) {
        PageRequest pr = PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "publishedAt"));
        return repo.findAll(pr).getContent();
    }

    public News byId(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("News", id));
    }

    public News create(NewsCreationDto d) {
        News n = NewsMapper.fromCreate(d);
        if (n.getPublishedAt() == null) n.setPublishedAt(Instant.now());
        return repo.save(n);
    }

    public News update(Long id, NewsUpdateDto d) {
        News n = byId(id);
        NewsMapper.applyUpdate(d, n);
        return repo.save(n);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new NotFoundException("News", id);
        repo.deleteById(id);
    }
}

