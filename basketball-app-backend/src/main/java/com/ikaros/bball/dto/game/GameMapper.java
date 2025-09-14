package com.ikaros.bball.dto.game;

import com.ikaros.bball.game.Game;

public class GameMapper {
    public static GameDto toDto(Game g) {
        return new GameDto(
                g.getId(), g.getOpponent(), g.getHome(), g.getVenue(),
                g.getTipoff(), g.getCompetition(), g.getTicketsAvailable(), g.getTicketPrice()
        );
    }

    public static Game fromCreate(GameCreationDto d) {
        var g = new Game();
        g.setOpponent(d.opponent());
        g.setHome(d.home());
        g.setTipoff(d.tipoff());
        g.setTicketsAvailable(d.ticketsAvailable());
        g.setTicketPrice(d.ticketPrice());
        g.setVenue(d.venue());
        g.setCompetition(d.competition());
        return g;
    }

    public static void applyUpdate(GameUpdateDto d, Game g) {
        if (d.opponent()!=null) g.setOpponent(d.opponent());
        if (d.home()!=null) g.setHome(d.home());
        if (d.venue()!=null) g.setVenue(d.venue());
        if (d.tipoff()!=null) g.setTipoff(d.tipoff());
        if (d.competition()!=null) g.setCompetition(d.competition());
        if (d.ticketsAvailable()!=null) g.setTicketsAvailable(d.ticketsAvailable());
        if (d.ticketPrice()!=null) g.setTicketPrice(d.ticketPrice());
    }
}
