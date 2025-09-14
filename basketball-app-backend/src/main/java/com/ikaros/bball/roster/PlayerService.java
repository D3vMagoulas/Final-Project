package com.ikaros.bball.roster;

import com.ikaros.bball.exception.ConflictException;
import com.ikaros.bball.exception.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepository repo;
    public PlayerService(PlayerRepository repo){ this.repo = repo; }

    public List<Player> roster() {
        return repo.findAll(
                Sort.by("position").ascending()
                        .and(Sort.by("lastName", "firstName"))
        );
    }

    public Player byId(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Player", id));
    }

    public Player add(Player p, MultipartFile image) {
        if (p.getNumberOnJersey()!=null && repo.existsByNumberOnJersey(p.getNumberOnJersey()))
            throw new ConflictException("Jersey number already in use.");
        if (image != null && !image.isEmpty()) {
            p.setPhotoUrl(storeImage(image));
        }
        return repo.save(p);
    }

    public Player update(Long id, Player p, MultipartFile image) {
        Player existing = byId(id);
        if (p.getNumberOnJersey()!=null
                && !p.getNumberOnJersey().equals(existing.getNumberOnJersey())
                && repo.existsByNumberOnJersey(p.getNumberOnJersey())) {
            throw new ConflictException("Jersey number already in use.");
        }
        p.setId(existing.getId());
        if (image != null && !image.isEmpty()) {
            p.setPhotoUrl(storeImage(image));
        }
        return repo.save(p);
    }

    private String storeImage(MultipartFile file) {
        try {
            String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
            Path uploadDir = Paths.get("uploads/players");
            Files.createDirectories(uploadDir);
            Path destination = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/players/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new NotFoundException("Player", id);
        repo.deleteById(id);
    }
}