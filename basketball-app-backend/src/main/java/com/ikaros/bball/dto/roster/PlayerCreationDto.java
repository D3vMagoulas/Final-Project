package com.ikaros.bball.dto.roster;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record PlayerCreationDto(
        @NotBlank String firstName,
        @NotBlank String lastName,
        String position,
        @Positive Integer numberOnJersey,
        @Positive Double heightCm,
        LocalDate birthDate,
        String nationality,
        Boolean active
) {}
