package sudoku;

import org.springframework.stereotype.Component;

@Component
public class SudokuSolver {
    
    public int[][] solve(int[][] grid) {
        
        if(!solveRecursive(grid)) {
            throw new IllegalArgumentException("Unlösbares oder Fehlerhaftes Sudoku-Startgitter");
        }
        return grid;
        
    }
    
    private boolean solveRecursive(int[][] grid){
        
        for(int row = 0; row < 9; row++){
            for (int col = 0; col < 9; col++){
                if (grid[row][col] == 0){
                    for (int val = 1; val <= 9; val++){
                        grid[row][col] = val;
                        if (gridValidated(grid) && solveRecursive(grid)){
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                    return false;
                }
            }
        }

        return true;

        /*//nach der nächsten Zelle schauen
        boolean getNextCell= false;
        outer:
        while (!getNextCell) {
            for(int s= changedRowBefore; s < 9; s++){
                for(int i = 0; i<9; i++){
                    if(grid[s][i] == 0){
                        changingRowNext = s;
                        changingColumnNext = i;
                        getNextCell= true;
                        break outer;
                    }
                }
            }   
        }



        //Zelle von 1 bis 9 - jeweils Aufruf zum Backtracken
        for(int i = 1; i<10; i++){
            grid[changingRowNext][changingColumnNext] = i;
            if(gridValidated(grid)){
                if(!sudokuSolved(grid)){
                    solveNextStep(grid, changingRowNext, changingColumnNext);
                }
            }
        }
        return grid;*/
    }



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