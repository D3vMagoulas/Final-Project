package com.ikaros.bball.dto.roster;

import com.ikaros.bball.roster.Player;

public class PlayerMapper {

    public static PlayerDto toDto(Player p){
        return new PlayerDto(
                p.getId(),
                p.getFirstName(),
                p.getLastName(),
                p.getPosition(),
                p.getNumberOnJersey(),
                p.getHeightCm(),
                p.getBirthDate(),
                p.getNationality(),
                p.getPhotoUrl(),
                p.getActive()
        );
    }

    public static Player fromCreate(PlayerCreationDto d){
        var p = new Player();
        p.setFirstName(d.firstName());
        p.setLastName(d.lastName());
        p.setPosition(d.position());
        p.setNumberOnJersey(d.numberOnJersey());
        p.setHeightCm(d.heightCm());
        p.setBirthDate(d.birthDate());
        p.setNationality(d.nationality());
        p.setActive(d.active() == null || d.active());
        return p;
    }

    public static void applyUpdate(PlayerUpdateDto d, Player p){
        if (d.firstName()!=null)
            p.setFirstName(d.firstName());
        if (d.lastName()!=null)
            p.setLastName(d.lastName());
        if (d.position()!=null)
            p.setPosition(d.position());
        if (d.numberOnJersey()!=null)
            p.setNumberOnJersey(d.numberOnJersey());
        if (d.heightCm()!=null)
            p.setHeightCm(d.heightCm());
        if (d.birthDate()!=null)
            p.setBirthDate(d.birthDate());
        if (d.nationality()!=null)
            p.setNationality(d.nationality());
        if (d.photoUrl()!=null)
            p.setPhotoUrl(d.photoUrl());
        if (d.active()!=null)
            p.setActive(d.active());
    }
}
