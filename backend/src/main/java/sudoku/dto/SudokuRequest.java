package sudoku.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

//sudoku Request: for POST-Request, when solving a sudoku
public record SudokuRequest(@NotNull @Size(min = 9, max = 9) int[][] grid) {
}