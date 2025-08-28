package com.ikaros.bball.game;

import com.ikaros.bball.dto.game.GameDto;
import com.ikaros.bball.dto.game.GameCreationDto;  // <- if you named it GameCreateDto, import that instead
import com.ikaros.bball.dto.game.GameUpdateDto;
import com.ikaros.bball.dto.game.GameMapper;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    private final GameService service;
    public GameController(GameService service) { this.service = service; }

    @GetMapping
    public List<GameDto> all() {
        return service.all().stream().map(GameMapper::toDto).toList();
    }

    @GetMapping("/{id}")
    public GameDto one(@PathVariable Long id) {
        return GameMapper.toDto(service.byId(id));
    }

    @GetMapping("/upcoming")
    public List<GameDto> upcoming() {
        return service.upcoming().stream().map(GameMapper::toDto).toList();
    }

    @PostMapping
    public GameDto create(@Valid @RequestBody GameCreationDto body) {
        return GameMapper.toDto(service.create(GameMapper.fromCreate(body)));
    }

    @PutMapping("/{id}")
    public GameDto update(@PathVariable Long id, @RequestBody GameUpdateDto body) {
        var entity = service.byId(id);
        GameMapper.applyUpdate(body, entity);
        return GameMapper.toDto(service.update(id, entity));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
