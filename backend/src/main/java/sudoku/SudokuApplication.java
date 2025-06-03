package sudoku;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.*;

import sudoku.auth.AuthProperties;



@SpringBootApplication
@EnableConfigurationProperties(AuthProperties.class)
public class SudokuApplication {

    //Main Application
    public static void main(String[] args) {
        SpringApplication.run(SudokuApplication.class, args);
    }
    }

    /* Smoke-Test Controller */
    @RestController
    @RequestMapping("/api/ping")
    class PingController {
        @GetMapping
        public String pong() {
            return "pong";
    }
}
