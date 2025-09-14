package com.ikaros.bball.dto.roster;

import java.time.LocalDate;

public record PlayerUpdateDto(
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

