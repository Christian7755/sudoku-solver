package sudoku.dto;


//Sudoku Response- um generierte oder gelöste Sudokus zurückzugeben
public record SudokuResponse(
    int[][] grid,
    boolean solvable,
    String message) {}
