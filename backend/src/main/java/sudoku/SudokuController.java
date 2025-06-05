package sudoku;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

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

        //das gelöste Sudoku wird zur Response hinzugefügt
        int[][] solvedGrid = sudokuService.solve(request.grid());

        //Boolean changeable: mit Wahrheitswerten für die Antwort gefüllt, falls nicht vorhanden
        boolean[][] changeable;
        if( request.changeable() != null){
            changeable = request.changeable();
        }
        else { changeable = defaultchangeable(null);}

        var response = new SudokuResponse(
            solvedGrid,
            true,
            "Solved successfully",
            changeable
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/generate")
    public ResponseEntity<SudokuResponse> generate(){
        System.out.println("SudokuController: Eingehender Request für generate empfangen!");

        try{
            int[][] generatedGrid = sudokuService.generate();

            //Zusätzlich muss noch festgelegt werden, dass bestimmte Zellen nicht verändert werden dürfen
            boolean[][] changeable = new boolean[9][9];
            for(int i = 0; i < 9; i++) {
                for (int j = 0; j < 9; j++) {
                    changeable[i][j] = generatedGrid[i][j] == 0;
                }
            }
            var response = new SudokuResponse(generatedGrid, true, "New sudoku generated", changeable);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new SudokuResponse(null, false, e.getMessage()));
        }
    }

    //um das Sudoku zu exportieren 
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


    /* Um changeable überall auf Wahr zu markieren 
    z.B. wenn dazu keine Angaben in der SudokuRequest sind */
    private boolean[][] defaultchangeable(int[][] grid) {
        boolean[][] changeable = new boolean[9][9];
        for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            changeable[i][j] = true;
        }
    }
        return changeable;
    }
}
