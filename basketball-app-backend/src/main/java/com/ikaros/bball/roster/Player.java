package com.ikaros.bball.roster;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String firstName;
    private String lastName;
    private String position;
    private Integer numberOnJersey;
    private Double heightCm;
    private LocalDate birthDate;
    private String nationality;
    private String photoUrl;
    private Boolean active = true;

    public Player() {}

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}

    public String getFirstName(){return firstName;}
    public void setFirstName(String v){this.firstName=v;}

    public String getLastName(){return lastName;}
    public void setLastName(String v){this.lastName=v;}

    public String getPosition(){return position;}
    public void setPosition(String v){this.position=v;}

    public Integer getNumberOnJersey(){return numberOnJersey;}
    public void setNumberOnJersey(Integer v){this.numberOnJersey=v;}

    public Double getHeightCm(){return heightCm;}
    public void setHeightCm(Double v){this.heightCm=v;}

    public LocalDate getBirthDate(){return birthDate;}
    public void setBirthDate(LocalDate v){this.birthDate=v;}

    public String getNationality(){return nationality;}
    public void setNationality(String v){this.nationality=v;}

    public String getPhotoUrl(){return photoUrl;}
    public void setPhotoUrl(String v){this.photoUrl=v;}

    public Boolean getActive(){return active;}
    public void setActive(Boolean v){this.active=v;}
}

