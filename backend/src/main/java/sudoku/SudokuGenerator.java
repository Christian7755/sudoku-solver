package sudoku;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import java.lang.Character;
import java.net.URI;


@Component
public class SudokuGenerator {

    private final RestTemplate restTemplate;

    //Rest Template um die Dosuku API aufzurufen und zu verwenden
    @Autowired
    public SudokuGenerator() {
        this.restTemplate = new RestTemplate();
    }

    public int[][] generate() {
        try {
            //Aufruf Dosuku API
            URI url = URI.create(
                "https://sudoku-api.vercel.app/api/dosuku"
              + "?query=%7Bnewboard(limit:1)%7Bgrids%7Bvalue%7D%7D%7D"
            );
            
            String raw = restTemplate.getForObject(url, String.class);
            System.out.println("RAW JSON:\n" + raw);

            //Validieren der Response
            ApiResponse response = restTemplate.getForObject(url, ApiResponse.class);
            if (response == null 
                            || response.getNewboard() == null
                            || response.getNewboard().getGrids() == null
                            || response.getNewboard().getGrids().length == 0
            ) {
                throw new IllegalStateException("Ungültige Antwort von Sudoku-API");
            }

            //Rückgabe der entsprechenden Werte anhand der erforderten Struktur
            return response.getNewboard().getGrids()[0].getValue();
        } catch (Exception e) {
            System.out.println("Fehler beim Abrufen des Sudoku: " + e.getMessage());
            return new int[9][9]; // Fallback
        }
    }


    private int[][] parseProblem(String problem) {
        int[][] board = new int[9][9];
        for (int i = 0; i < 81; i++) {
            char c = problem.charAt(i);
            board[i / 9][i%9] = (c == '.') ? 0 : Character.getNumericValue(c);
        }
        return board;
    }

    // Top-Level-Klasse für’s JSON-Mapping
    private static class ApiResponse {
        private Newboard newboard;

        public Newboard getNewboard() {
            return newboard;
        }

        public void setNewboard(Newboard newboard) {
            this.newboard = newboard;
        }
    }

    // Entspricht { "newboard": { "grids": [ … ] } }
    private static class Newboard {
        private Grid[] grids;

        public Grid[] getGrids() {
            return grids;
        }

        public void setGrids(Grid[] grids) {
            this.grids = grids;
        }
    }

    // Entspricht jedem Eintrag in "grids"
    private static class Grid {
        // jetzt Array von Arrays von ints
        private int[][] value;

        public int[][] getValue() {
            return value;
        }

        public void setValue(int[][] value) {
            this.value = value;
        }
    }




}
