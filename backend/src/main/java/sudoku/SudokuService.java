package sudoku;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SudokuService {

    private final GridValidator validator;
    private final SudokuSolver solver;
    private final SudokuGenerator generator;

    public int[][] solve(int[][] grid) {
        //validator.validate(grid);
        return solver.solve(grid);
    } 

    public int[][] generate(){
        //validator.validate(generatedSudoku);
        return generator.generate();
    }
}
