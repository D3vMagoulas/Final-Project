package com.ikaros.bball.news;

import com.ikaros.bball.dto.news.NewsDto;
import com.ikaros.bball.dto.news.NewsCreationDto;
import com.ikaros.bball.dto.news.NewsUpdateDto;
import com.ikaros.bball.dto.news.NewsMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NewsDto> create(@Valid @RequestPart("news") NewsCreationDto d,
                                          @RequestPart(value = "image", required = false) MultipartFile image,
                                          @RequestPart(value = "attachments", required = false) List<MultipartFile> attachments) {
        News saved = service.create(d, image, attachments);
        return ResponseEntity
                .created(URI.create("/api/news/" + saved.getId()))
                .body(NewsMapper.toDto(saved));
    }

    @Operation(summary = "Update news")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public NewsDto update(@PathVariable Long id,
                          @Valid @RequestPart("news") NewsUpdateDto d,
                          @RequestPart(value = "image", required = false) MultipartFile image,
                          @RequestPart(value = "attachments", required = false) List<MultipartFile> attachments) {
        return NewsMapper.toDto(service.update(id, d, image, attachments));
    }

    @Operation(summary = "Delete news")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}