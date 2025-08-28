package com.ikaros.bball.dto.roster;

import java.time.LocalDate;

public record PlayerDto(
        Long id,
        String firstName,
        String lastName,
        String position,
        Integer numberOnJersey,
        Double heightCm,
        LocalDate birthDate,
        String nationality,
        String photoUrl,
        Boolean active
) {}
