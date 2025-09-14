package com.ikaros.bball.roster;

import com.ikaros.bball.dto.roster.PlayerCreationDto;
import com.ikaros.bball.dto.roster.PlayerDto;
import com.ikaros.bball.dto.roster.PlayerMapper;
import com.ikaros.bball.dto.roster.PlayerUpdateDto;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public PlayerDto add(@Valid @RequestPart("player") PlayerCreationDto body,
                         @RequestPart(value = "image", required = false) MultipartFile image) {
        var saved = service.add(PlayerMapper.fromCreate(body), image);
        return PlayerMapper.toDto(saved);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public PlayerDto update(@PathVariable Long id,
                            @RequestPart("player") PlayerUpdateDto body,
                            @RequestPart(value = "image", required = false) MultipartFile image) {
        var entity = service.byId(id);
        PlayerMapper.applyUpdate(body, entity);
        return PlayerMapper.toDto(service.update(id, entity, image));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}