package com.basketballteam.basketball_app.dto.ticket;

import jakarta.validation.constraints.*;

public record TicketOrderRequestDto(
        @NotNull Long gameId,
        @NotNull @Positive Integer quantity,
        @NotBlank String buyerName,
        @Email String buyerEmail
) {}
