package com.basketballteam.basketball_app.dto.ticket;

import com.basketballteam.basketball_app.ticket.TicketPurchase;

public class TicketMapper {

    public static TicketPurchase fromRequest(TicketOrderRequestDto d) {
        var t = new TicketPurchase();
        t.setGameId(d.gameId());
        t.setQuantity(d.quantity());
        t.setBuyerName(d.buyerName());
        t.setBuyerEmail(d.buyerEmail());
        return t;
    }

    public static TicketOrderResponseDto toResponse(TicketPurchase t) {
        return new TicketOrderResponseDto(
                t.getId(),
                t.getGameId(),
                t.getQuantity(),
                t.getStatus(),
                t.getCreatedAt()
        );
    }
}
