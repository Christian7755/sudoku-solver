package sudoku.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

//sudoku Request: für die POST-Request
@JsonInclude(JsonInclude.Include.NON_NULL)
public record SudokuRequest(
    @NotNull @Size(min = 9, max = 9) int[][] grid, 
    boolean[][] changeable
) {}