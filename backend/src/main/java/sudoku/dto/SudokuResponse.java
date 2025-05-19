package sudoku.dto;


//Sudoku Response- used for returning solved or generated sudokus
public record SudokuResponse(
    int[][] grid,
    boolean solvable,
    String message) {}
