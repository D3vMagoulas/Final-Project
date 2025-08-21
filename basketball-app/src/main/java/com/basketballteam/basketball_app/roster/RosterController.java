package com.basketballteam.basketball_app.roster;

import com.basketballteam.basketball_app.dto.roster.PlayerCreationDto;
import com.basketballteam.basketball_app.dto.roster.PlayerDto;
import com.basketballteam.basketball_app.dto.roster.PlayerMapper;
import com.basketballteam.basketball_app.dto.roster.PlayerUpdateDto;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roster")
public class RosterController {

    private final PlayerService service;

    public RosterController(PlayerService service) {
        this.service = service;
    }

    @GetMapping
    public List<PlayerDto> roster() {
        return service.roster().stream().map(PlayerMapper::toDto).toList();
    }

    @GetMapping("/{id}")
    public PlayerDto one(@PathVariable Long id) {
        return PlayerMapper.toDto(service.byId(id));
    }

    @PostMapping
    public PlayerDto add(@Valid @RequestBody PlayerCreationDto body) {
        var saved = service.add(PlayerMapper.fromCreate(body));
        return PlayerMapper.toDto(saved);
    }

    @PutMapping("/{id}")
    public PlayerDto update(@PathVariable Long id, @RequestBody PlayerUpdateDto body) {
        var entity = service.byId(id);
        PlayerMapper.applyUpdate(body, entity);
        return PlayerMapper.toDto(service.update(id, entity));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
