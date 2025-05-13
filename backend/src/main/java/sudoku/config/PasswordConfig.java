// src/main/java/sudoku/config/PasswordConfig.java
package sudoku.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // unterstützt {bcrypt}, {noop}, {sha256}, …
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
