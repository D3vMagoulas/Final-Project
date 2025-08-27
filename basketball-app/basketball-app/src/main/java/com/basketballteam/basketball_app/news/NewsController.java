package com.basketballteam.basketball_app.news;

import com.basketballteam.basketball_app.dto.news.NewsDto;
import com.basketballteam.basketball_app.dto.news.NewsCreationDto;
import com.basketballteam.basketball_app.dto.news.NewsUpdateDto;
import com.basketballteam.basketball_app.dto.news.NewsMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@Tag(name = "News")
@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService service;

    public NewsController(NewsService service) {
        this.service = service;
    }

    @Operation(summary = "List news (paged)")
    @GetMapping
    public Page<NewsDto> list(
            @ParameterObject
            @PageableDefault(size = 10, sort = "publishedAt", direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        return service.list(pageable).map(NewsMapper::toDto);
    }

    @Operation(summary = "Latest N news (simple list)")
    @GetMapping("/latest")
    public List<NewsDto> latest(@RequestParam(defaultValue = "10") int size) {
        return service.latest(size).stream().map(NewsMapper::toDto).toList();
    }

    @Operation(summary = "Get one news by id")
    @GetMapping("/{id}")
    public NewsDto one(@PathVariable Long id) {
        return NewsMapper.toDto(service.byId(id));
    }

    @Operation(summary = "Create news")
    @PostMapping
    public ResponseEntity<NewsDto> create(@Valid @RequestBody NewsCreationDto d) {
        News saved = service.create(d);
        return ResponseEntity
                .created(URI.create("/api/news/" + saved.getId()))
                .body(NewsMapper.toDto(saved));
    }

    @Operation(summary = "Update news")
    @PutMapping("/{id}")
    public NewsDto update(@PathVariable Long id, @Valid @RequestBody NewsUpdateDto d) {
        return NewsMapper.toDto(service.update(id, d));
    }

    @Operation(summary = "Delete news")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

