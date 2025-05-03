package sudoku;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SudokuService {

    private final GridValidator validator;
    private final SudokuSolver solver;

    public int[][] solve(int[][] grid) {
        validator.validate(grid);
        return grid;
        //return solver.solve(grid);
    } 
}
