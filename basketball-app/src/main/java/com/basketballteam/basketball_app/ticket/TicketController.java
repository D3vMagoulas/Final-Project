package com.basketballteam.basketball_app.ticket;

import com.basketballteam.basketball_app.dto.ticket.*;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    private final TicketService service;
    public TicketController(TicketService service) { this.service = service; }

    @PostMapping
    public TicketOrderResponseDto order(@Valid @RequestBody TicketOrderRequestDto body) {
        var saved = service.placeOrder(TicketMapper.fromRequest(body));
        return TicketMapper.toResponse(saved);
    }
}


