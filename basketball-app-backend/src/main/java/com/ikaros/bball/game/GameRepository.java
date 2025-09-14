package com.ikaros.bball.game;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.OffsetDateTime;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByTipoffAfterOrderByTipoffAsc(OffsetDateTime dateTime);
}
