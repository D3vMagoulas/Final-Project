package com.ikaros.bball.dto.game;

import java.time.OffsetDateTime;

public record GameDto(
        Long id,
        String opponent,
        Boolean home,
        String venue,
        OffsetDateTime tipoff,
        String competition,
        Integer ticketsAvailable,
        Double ticketPrice
) {}

