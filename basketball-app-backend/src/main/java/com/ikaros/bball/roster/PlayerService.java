package com.ikaros.bball.roster;

import com.ikaros.bball.exception.ConflictException;
import com.ikaros.bball.exception.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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

    public Player add(Player p) {
        if (p.getNumberOnJersey()!=null && repo.existsByNumberOnJersey(p.getNumberOnJersey()))
            throw new ConflictException("Jersey number already in use.");
        return repo.save(p);
    }

    public Player update(Long id, Player p) {
        Player existing = byId(id);
        if (p.getNumberOnJersey()!=null
                && !p.getNumberOnJersey().equals(existing.getNumberOnJersey())
                && repo.existsByNumberOnJersey(p.getNumberOnJersey())) {
            throw new ConflictException("Jersey number already in use.");
        }
        p.setId(existing.getId());
        return repo.save(p);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new NotFoundException("Player", id);
        repo.deleteById(id);
    }
}
