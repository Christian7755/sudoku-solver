package sudoku;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dto.SudokuRequest;
import dto.SudokuResponse;

@RestController
@RequestMapping("/api/sudoku")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SudokuController {
    
    private final SudokuService sudokuService;

    @PostMapping("/solve")
    public ResponseEntity<SudokuResponse> solve(@Valid @RequestBody SudokuRequest request){

        int[][] solvedGrid = sudokuService.solve(request.grid());
        var response = new SudokuResponse(
            solvedGrid,
            true,
            "Solved successfully"
        );
        return ResponseEntity.ok(response);
    }
}
