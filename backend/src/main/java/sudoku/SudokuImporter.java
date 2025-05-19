package sudoku;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class SudokuImporter {

    /**
     * Liest eine CSV-Datei ein und parst sie zu einem 9×9 int[][].
     * Erwartet genau 9 Zeilen und 9 Werte pro Zeile.
     */
    public int[][] parseCsv(MultipartFile file) throws IOException {
        String content = new String(file.getBytes(), StandardCharsets.UTF_8).strip();
        String[] lines = content.split("\\R");
        if (lines.length != 9) {
            throw new IllegalArgumentException("CSV muss genau 9 Zeilen haben, hat aber " + lines.length);
        }

        int[][] grid = new int[9][9];
        for (int r = 0; r < 9; r++) {
            String[] cols = lines[r].split(",");
            if (cols.length != 9) {
                throw new IllegalArgumentException("Zeile " + (r + 1) + " benötigt 9 Werte, hat aber " + cols.length);
            }
            for (int c = 0; c < 9; c++) {
                try {
                    grid[r][c] = Integer.parseInt(cols[c].trim());
                } catch (NumberFormatException ex) {
                    throw new IllegalArgumentException(
                        "Ungültige Zahl in Zeile " + (r + 1) + ", Spalte " + (c + 1) + ": '" + cols[c] + "'"
                    );
                }
            }
        }
        return grid;
    }
}

