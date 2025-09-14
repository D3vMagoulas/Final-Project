package com.ikaros.bball.dto.ticket;

import jakarta.validation.constraints.*;

public record TicketOrderRequestDto(
        @NotNull Long gameId,
        @NotNull @Positive Integer quantity,
        @NotBlank String buyerName,
        @Email String buyerEmail
) {}
