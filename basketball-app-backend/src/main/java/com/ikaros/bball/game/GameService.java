package com.ikaros.bball.game;

import com.ikaros.bball.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class GameService {
    private final GameRepository repo;
    public GameService(GameRepository repo) { this.repo = repo; }

    public List<Game> all() { return repo.findAll(); }

    public Game byId(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Game", id));
    }

    public Game create(Game g) { return repo.save(g); }

    public Game update(Long id, Game g) {
        Game existing = byId(id);
        g.setId(existing.getId());
        return repo.save(g);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new NotFoundException("Game", id);
        repo.deleteById(id);
    }

    public List<Game> upcoming() {
        return repo.findByTipoffAfterOrderByTipoffAsc(OffsetDateTime.now());
    }
}

