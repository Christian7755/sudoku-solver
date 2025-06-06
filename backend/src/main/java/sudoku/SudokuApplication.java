package sudoku;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import sudoku.auth.AuthProperties;



@SpringBootApplication
@EnableConfigurationProperties(AuthProperties.class)
public class SudokuApplication {

    //Main Application
    public static void main(String[] args) {
        SpringApplication.run(SudokuApplication.class, args);
    }
}

