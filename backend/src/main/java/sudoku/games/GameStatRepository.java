package sudoku.games;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameStatRepository extends JpaRepository<GameStat, Long> {
    
    List<GameStat> findByUsername(String username);

    Optional<GameStat> findById(Long id); // Optional ist typisch bei findById
}
