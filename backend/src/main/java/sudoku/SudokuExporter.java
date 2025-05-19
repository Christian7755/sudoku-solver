package sudoku;

import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;

@Component
public class SudokuExporter {

    /**
     * Wandelt ein 9×9-Grid in eine CSV-Repräsentation um.
     * Jede Zeile des Grids wird eine Zeile im CSV, Werte durch Kommata getrennt.
     */
    public byte[] exportToCsv(int[][] grid) {
        StringBuilder sb = new StringBuilder();
        for (int[] row : grid) {
            for (int i = 0; i < row.length; i++) {
                sb.append(row[i]);
                if (i < row.length - 1) {
                    sb.append(',');
                }
            }
            sb.append('\n');
        }
        return sb.toString().getBytes(StandardCharsets.UTF_8);
    }
}
