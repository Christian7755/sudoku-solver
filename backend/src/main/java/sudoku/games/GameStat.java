package sudoku.games;

import java.time.LocalDateTime;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class GameStat {
    @Id 
    @GeneratedValue
    private long id;

    private String username;

    private LocalDateTime startTime;
    
    private LocalDateTime endTime;

    private int timeUsed;
    
    private boolean completed;

    public GameStat(){
        this.completed = false;
    }
}
