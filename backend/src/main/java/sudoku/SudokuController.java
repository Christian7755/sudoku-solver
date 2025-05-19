package sudoku;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import sudoku.dto.SudokuRequest;
import sudoku.dto.SudokuResponse;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.http.ContentDisposition;


import java.io.IOException;


//Sudoku-Controller. Used for all Http Requests concerning the sudoku
@RestController
@RequestMapping("/api/sudoku")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SudokuController {
    
    private final SudokuService sudokuService;
    private final SudokuExporter sudokuExporter;
    private final SudokuImporter sudokuImporter;

    @PostMapping("/solve")
    public ResponseEntity<SudokuResponse> solve(@Valid @RequestBody SudokuRequest request){
        //for debbuging
        System.out.println("SudokuController: Eingehender Request für solving empfangen!");
        System.out.println("Grid: " + Arrays.deepToString(request.grid()));

        //the solved sudoku is added to a new sudoku response
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

    //for export of the current sudoku. 
    @PostMapping(value = "/export", produces = "text/csv")
    public ResponseEntity<byte[]> exportCsv(@Valid @RequestBody SudokuRequest request) {
        int[][] grid = request.grid();
        byte[] csvBytes = sudokuExporter.exportToCsv(grid);

        HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(new MediaType("text", "csv", StandardCharsets.UTF_8));
        headers.setContentDisposition(
            ContentDisposition.builder("attachment")
                              .filename("sudoku.csv")
                              .build()
        );

        return new ResponseEntity<>(csvBytes, headers, HttpStatus.OK);
    }

    /**
     * Importiert ein Sudoku aus einer hochgeladenen CSV-Datei.
     * Feld-Name muss "file" sein.
     */
    @PostMapping(
        value = "/import",
      consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<SudokuResponse> importCsv(@RequestPart("file") MultipartFile file) {
        try {
            int[][] grid = sudokuImporter.parseCsv(file);
            return ResponseEntity.ok(new SudokuResponse(grid, true, "Import erfolgreich"));
        } catch (IllegalArgumentException | IOException e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new SudokuResponse(null, false, "Import fehlgeschlagen: " + e.getMessage()));
        }
    }
}
