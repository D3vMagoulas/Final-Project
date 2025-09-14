package com.ikaros.bball.ticket;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class TicketPurchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private Long gameId;
    private Integer quantity;
    private String buyerName;
    private String buyerEmail;
    private String status = "PENDING";
    private Instant createdAt = Instant.now();

    public TicketPurchase() {}

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}

    public Long getGameId(){return gameId;}
    public void setGameId(Long v){this.gameId=v;}

    public Integer getQuantity(){return quantity;}
    public void setQuantity(Integer v){this.quantity=v;}

    public String getBuyerName(){return buyerName;}
    public void setBuyerName(String v){this.buyerName=v;}

    public String getBuyerEmail(){return buyerEmail;}
    public void setBuyerEmail(String v){this.buyerEmail=v;}

    public String getStatus(){return status;}
    public void setStatus(String v){this.status=v;}

    public Instant getCreatedAt(){return createdAt;}
    public void setCreatedAt(Instant v){this.createdAt=v;}
}

