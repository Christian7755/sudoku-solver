package sudoku;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SudokuService {

    private final SudokuSolver solver;
    private final SudokuGenerator generator;

    public int[][] solve(int[][] grid) {
        return solver.solve(grid);
    } 

    public int[][] generate(){
        return generator.generate();
    }
    public boolean validate(int[][] grid){
        return solver.validate(grid);
    }
}
