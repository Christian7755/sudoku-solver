package sudoku;

import org.springframework.stereotype.Component;

@Component
public class GridValidator {
    
    public void validate(int[][] grid) {
        // Grundlegende Validierung
        if (grid == null) {
            throw new IllegalArgumentException("Grid cannot be null");
        }
        
        if (grid.length != 9) {
            throw new IllegalArgumentException("Grid must have exactly 9 rows");
        }
        
        for (int i = 0; i < 9; i++) {
            if (grid[i] == null || grid[i].length != 9) {
                throw new IllegalArgumentException("Each row must have exactly 9 columns");
            }
            
            for (int j = 0; j < 9; j++) {
                if (grid[i][j] < 0 || grid[i][j] > 9) {
                    throw new IllegalArgumentException("Grid values must be between 0 and 9");
                }
            }
        }
        
        // Erweiterte Validierung (prüfen, ob das Grid gültige Sudoku-Regeln einhält)
        validateRows(grid);
        validateColumns(grid);
        validateBoxes(grid);
    }
    
    private void validateRows(int[][] grid) {
        for (int row = 0; row < 9; row++) {
            boolean[] used = new boolean[10]; // Index 0 wird nicht verwendet
            for (int col = 0; col < 9; col++) {
                int num = grid[row][col];
                if (num != 0) { // 0 steht für leere Zellen
                    if (used[num]) {
                        throw new IllegalArgumentException("Row " + (row + 1) + " contains duplicate value: " + num);
                    }
                    used[num] = true;
                }
            }
        }
    }
    
    private void validateColumns(int[][] grid) {
        for (int col = 0; col < 9; col++) {
            boolean[] used = new boolean[10]; // Index 0 wird nicht verwendet
            for (int row = 0; row < 9; row++) {
                int num = grid[row][col];
                if (num != 0) { // 0 steht für leere Zellen
                    if (used[num]) {
                        throw new IllegalArgumentException("Column " + (col + 1) + " contains duplicate value: " + num);
                    }
                    used[num] = true;
                }
            }
        }
    }
    
    private void validateBoxes(int[][] grid) {
        for (int boxRow = 0; boxRow < 3; boxRow++) {
            for (int boxCol = 0; boxCol < 3; boxCol++) {
                boolean[] used = new boolean[10]; // Index 0 wird nicht verwendet
                for (int i = 0; i < 3; i++) {
                    for (int j = 0; j < 3; j++) {
                        int row = boxRow * 3 + i;
                        int col = boxCol * 3 + j;
                        int num = grid[row][col];
                        if (num != 0) { // 0 steht für leere Zellen
                            if (used[num]) {
                                throw new IllegalArgumentException("Box at position [" + (boxRow + 1) + "," + (boxCol + 1) + "] contains duplicate value: " + num);
                            }
                            used[num] = true;
                        }
                    }
                }
            }
        }
    }
}