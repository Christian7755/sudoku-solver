package sudoku;

import org.springframework.stereotype.Component;

@Component
public class GridValidator {
    
    public void validate(int[][] grid) {
        if (grid == null || grid.length != 9) {
            throw new IllegalArgumentException("Grid must be 9x9");
        }

        for (int[] row : grid) {
            if (row == null || row.length != 9)
                throw new IllegalArgumentException("Grid must be 9x9");
            for (int v : row)
                if (v < 0 || v > 9)
                    throw new IllegalArgumentException("Values must be 0‑9");
        }
    }
}
