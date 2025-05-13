package dto;

public record SudokuResponse(
    int[][] grid,
    boolean solvable,
    String message) {}
