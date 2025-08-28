package com.ikaros.bball.dto.game;

import jakarta.validation.constraints.*;

import java.time.OffsetDateTime;

public record GameCreationDto(
        @NotBlank String opponent,
        @NotNull Boolean home,
        @NotNull OffsetDateTime tipoff,
        @PositiveOrZero Integer ticketsAvailable,
        @PositiveOrZero Double ticketPrice,
        String venue,
        String competition
) {}

