package com.ikaros.bball.news;

import com.ikaros.bball.dto.news.NewsCreationDto;
import com.ikaros.bball.dto.news.NewsMapper;
import com.ikaros.bball.dto.news.NewsUpdateDto;
import com.ikaros.bball.exception.NotFoundException;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

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

    public News create(NewsCreationDto d, MultipartFile image, List<MultipartFile> attachments) {
        News n = NewsMapper.fromCreate(d);
        if (image != null && !image.isEmpty()) {
            n.setImageUrl(storeImage(image));
        }
        if (attachments != null && !attachments.isEmpty()) {
            n.setAttachmentUrls(storeAttachments(attachments));
        }
        return repo.save(n);
    }

    public News update(Long id, NewsUpdateDto d, MultipartFile image, List<MultipartFile> attachments) {
        News n = byId(id);
        NewsMapper.applyUpdate(d, n);
        if (image != null && !image.isEmpty()) {
            n.setImageUrl(storeImage(image));
        }
        if (attachments != null && !attachments.isEmpty()) {
            n.setAttachmentUrls(storeAttachments(attachments));
        }
        return repo.save(n);
    }

    private String storeImage(MultipartFile file) {
        try {
            String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
            Path uploadDir = Paths.get("uploads/news");
            Files.createDirectories(uploadDir);
            Path destination = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/news/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    private List<String> storeAttachments(List<MultipartFile> files) {
        return files.stream()
                .filter(f -> f != null && !f.isEmpty())
                .map(this::storeAttachment)
                .toList();
    }

    private String storeAttachment(MultipartFile file) {
        try {
            String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
            Path uploadDir = Paths.get("uploads/news/attachments");
            Files.createDirectories(uploadDir);
            Path destination = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/news/attachments/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new NotFoundException("News", id);
        repo.deleteById(id);
    }
}