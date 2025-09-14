package com.ikaros.bball.ticket;

import com.ikaros.bball.exception.BadRequestException;
import com.ikaros.bball.exception.ConflictException;
import com.ikaros.bball.exception.NotFoundException;
import com.ikaros.bball.game.Game;
import com.ikaros.bball.game.GameRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TicketService {
    private final TicketPurchaseRepository orders;
    private final GameRepository games;

    public TicketService(TicketPurchaseRepository orders, GameRepository games) {
        this.orders = orders; this.games = games;
    }

    @Transactional
    public TicketPurchase placeOrder(TicketPurchase req) {
        if (req.getGameId() == null) throw new BadRequestException("gameId is required.");
        if (req.getQuantity() == null || req.getQuantity() <= 0)
            throw new BadRequestException("quantity must be a positive integer.");

        Game g = games.findById(req.getGameId())
                .orElseThrow(() -> new NotFoundException("Game", req.getGameId()));

        int available = g.getTicketsAvailable() == null ? 0 : g.getTicketsAvailable();
        if (req.getQuantity() > available) throw new ConflictException("Not enough tickets available.");

        g.setTicketsAvailable(available - req.getQuantity());
        games.save(g);

        req.setStatus("CONFIRMED");
        return orders.save(req);
    }
}
