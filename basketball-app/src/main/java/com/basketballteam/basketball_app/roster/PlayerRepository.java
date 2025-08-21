package com.basketballteam.basketball_app.roster;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    boolean existsByNumberOnJersey(Integer numberOnJersey);
}
