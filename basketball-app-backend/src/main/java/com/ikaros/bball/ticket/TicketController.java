package com.ikaros.bball.ticket;

import com.ikaros.bball.dto.ticket.*;
import com.ikaros.bball.dto.ticket.TicketMapper;
import com.ikaros.bball.dto.ticket.TicketOrderRequestDto;
import com.ikaros.bball.dto.ticket.TicketOrderResponseDto;
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


