package sudoku;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sudoku.dto.SudokuRequest;
import sudoku.dto.SudokuResponse;

@RestController
@RequestMapping("/api/sudoku")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SudokuController {
    
    private final SudokuService sudokuService;

    @PostMapping("/solve")
    public ResponseEntity<SudokuResponse> solve(@Valid @RequestBody SudokuRequest request){
        System.out.println("SudokuController: Eingehender Request für solving empfangen!");
        System.out.println("Grid: " + Arrays.deepToString(request.grid()));

        int[][] solvedGrid = sudokuService.solve(request.grid());
        var response = new SudokuResponse(
            solvedGrid,
            true,
            "Solved successfully"
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/generate")
    public ResponseEntity<SudokuResponse> generate(){
        System.out.println("SudokuController: Eingehender Request für generate empfangen!");

        try{
            int[][] generatedGrid = sudokuService.generate();
            var response = new SudokuResponse(generatedGrid, true, "New sudoku generated");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new SudokuResponse(null, false, e.getMessage()));
        }
    }
}
