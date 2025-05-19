package sudoku;

import org.springframework.stereotype.Component;

@Component
public class SudokuSolver {
    
    public int[][] solve(int[][] grid) {
        
        //Aufruf der Methode zum Rekursiven lösen, als erster Iterationsschritt
        if(!solveRecursive(grid)) {
            throw new IllegalArgumentException("Unlösbares oder Fehlerhaftes Sudoku-Startgitter");
        }
        return grid;
        
    }
    

    //Algorithmus zum rekursiven Lösen des Sudokus. Liefert Wahrheitswert zurück für Backtracking
    private boolean solveRecursive(int[][] grid){
        
        //geht anhand der Zeilen und Spalten zur nächsten nicht belegten Zelle
        for(int row = 0; row < 9; row++){
            for (int col = 0; col < 9; col++){
                if (grid[row][col] == 0){
                    //Probieren der Werte von 1 bis 9
                    for (int val = 1; val <= 9; val++){
                        grid[row][col] = val;
                        //Validieren und Rekursiver Aufruf um das Sudoku zu lösen
                        if (gridValidated(grid) && solveRecursive(grid)){
                            return true;
                        }
                        //für das Backtracking: wenn die Varianten von 1-9 Fehlschlagen wird der Wert 0 gesetzt um einen Schritt zurückzugehen
                        grid[row][col] = 0;
                    }
                    return false;
                }
            }
        }

        return true;
    }


    //Prüft, ob das Sudoku gelöst ist. Liefert false, wenn ein Wert nicht vorhanden ist oder das Sudoku invalide ist
    private boolean sudokuSolved(int[][] grid) {
        if(gridValidated(grid)){
            for(int i = 0; i<9; i++){
                for(int s = 0; s <9; s++){
                    if(grid[i][s] == 0){
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }

    //Validiert das Gesamte Sudoku auf die Größe und die Einträge anhand der 3 Sudokuregeln.
    private boolean gridValidated(int[][] grid){
        if (grid.length != 9){
            throw new IllegalArgumentException("Grid muss 9 Zeilen haben");
        }
        for (int i = 0; i < 9; i++) {
            if (grid[i].length != 9) {
                throw new IllegalArgumentException("Jede Zeile muss 9 Spalten haben.");
            }
        }
        return validateRows(grid) && validateColumns(grid) && validateBoxes(grid);   
    }

    //Validation der Reiheneinträge
    private boolean validateRows(int[][] g) {
        for (int i = 0; i < 9; i++) {
            boolean[] seen = new boolean[10];  // Index 1..9
            for (int j = 0; j < 9; j++) {
                int v = g[i][j];
                if (v == 0) continue;
                if (v < 1 || v > 9) return false;
                if (seen[v]) return false;
                seen[v] = true;
            }
        }
        return true;
    }

    //Validation der Spalteneinträge
    private boolean validateColumns(int[][] g) {
        for (int j = 0; j < 9; j++) {
            boolean[] seen = new boolean[10];
            for (int i = 0; i < 9; i++) {
                int v = g[i][j];
                if (v == 0) continue;
                if (v < 1 || v > 9) return false;
                if (seen[v]) return false;
                seen[v] = true;
            }
        }
        return true;
    }

    //Validation der 9 Kästen
    private boolean validateBoxes(int[][] g) {
        // 3×3-Kästen: Start bei (0,0), (0,3), (0,6), (3,0), ...
        for (int boxRow = 0; boxRow < 9; boxRow += 3) {
            for (int boxCol = 0; boxCol < 9; boxCol += 3) {
                boolean[] seen = new boolean[10];
                for (int i = 0; i < 3; i++) {
                    for (int j = 0; j < 3; j++) {
                        int v = g[boxRow + i][boxCol + j];
                        if (v == 0) continue;
                        if (v < 1 || v > 9) return false;
                        if (seen[v]) return false;
                        seen[v] = true;
                    }
                }
            }
        }
        return true;
    }
}