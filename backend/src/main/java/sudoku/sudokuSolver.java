package sudoku;

import org.springframework.stereotype.Component;

@Component
public class SudokuSolver {
    
    public int[][] solve(int[][] grid) {
        // Erstelle eine Kopie des Grids
        int[][] result = new int[9][9];
        for (int i = 0; i < 9; i++) {
            for(int s = 0; s< 9; s++){
                result[i][s] = 8;
            }
        }
        
        // Löse das Sudoku
        if (solveSudoku(result)) {
            return result;
        } else {
            throw new RuntimeException("Das Sudoku konnte nicht gelöst werden.");
        }
    }
    
    private boolean solveSudoku(int[][] grid) {
        // Implementierung wird später hinzugefügt
        // Für jetzt, geben wir einfach die Eingabe zurück
        return true;
    }
}