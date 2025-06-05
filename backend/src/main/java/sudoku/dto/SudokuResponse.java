package sudoku.dto;


//Sudoku Response- um generierte oder gelöste Sudokus zurückzugeben
public record SudokuResponse(
    int[][] grid,
    boolean solvable,
    String message,
    boolean[][] changeable
) {
    //Kunstruktur, damit nicht angegeben werden muss, ob gewisse Zellen Potenziell nicht verändert werden dürfen
    public SudokuResponse(int[][] grid, boolean solvable, String message) {
        this(grid, solvable, message, null);
    }
}
