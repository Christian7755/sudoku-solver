package sudoku.games;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
public class GameStatController {
    @Autowired
    private GameStatRepository repository;

    @PostMapping("/start")
    public GameStat startGame(@RequestBody String username) {
        GameStat stat = new GameStat();
        stat.setUsername(username);
        stat.setStartTime(LocalDateTime.now());
        return repository.save(stat);
    }

    @PostMapping("/end/{id}")
    public GameStat endGame(@PathVariable Long id, @RequestBody boolean completed) {
        GameStat stat = repository.findById(id).orElseThrow();
        stat.setEndTime(LocalDateTime.now());
        stat.setCompleted(completed);
        return repository.save(stat);
    }

    @GetMapping("/{username}")
    public List<GameStat> getStats(@PathVariable String username) {
        return repository.findByUsername(username);
    }
}