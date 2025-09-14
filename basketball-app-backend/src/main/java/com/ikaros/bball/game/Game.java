package com.ikaros.bball.game;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String opponent;
    private Boolean home;         // true = home false = away
    private String venue;
    private OffsetDateTime tipoff;
    private String competition;
    private Integer ticketsAvailable;
    private Double ticketPrice;

    public Game() {}

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}

    public String getOpponent(){return opponent;}
    public void setOpponent(String o){this.opponent=o;}

    public Boolean getHome(){return home;}
    public void setHome(Boolean h){this.home=h;}

    public String getVenue(){return venue;} public void setVenue(String v){this.venue=v;}

    public OffsetDateTime getTipoff(){return tipoff;} public void setTipoff(OffsetDateTime t){this.tipoff=t;}

    public String getCompetition(){return competition;} public void setCompetition(String c){this.competition=c;}

    public Integer getTicketsAvailable(){return ticketsAvailable;}
    public void setTicketsAvailable(Integer t){this.ticketsAvailable=t;}

    public Double getTicketPrice(){return ticketPrice;}
    public void setTicketPrice(Double p){this.ticketPrice=p;}
}

