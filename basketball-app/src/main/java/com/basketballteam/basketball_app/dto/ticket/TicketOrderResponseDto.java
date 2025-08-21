package com.basketballteam.basketball_app.dto.ticket;

import java.time.Instant;

public record TicketOrderResponseDto(
        Long id,
        Long gameId,
        Integer quantity,
        String status,
        Instant createdAt
) {}
