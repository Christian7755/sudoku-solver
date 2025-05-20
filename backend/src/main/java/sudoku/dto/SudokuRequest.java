package sudoku.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

//sudoku Request: für die POST-Request, beim Lösen des Sudokus
public record SudokuRequest(@NotNull @Size(min = 9, max = 9) int[][] grid) {
}