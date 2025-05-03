package sudoku.dto;

import jakarta.validation.constraints.NotNull;

public record SudokuRequest(@NotNull int[][] grid) {
}