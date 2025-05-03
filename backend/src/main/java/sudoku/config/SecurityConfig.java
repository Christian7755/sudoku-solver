// src/main/java/sudoku/config/SecurityConfig.java
package sudoku.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {

        http
            // 1) CORS & CSRF – für reine JSON‑API CSRF abschalten:
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())

            // 2) Authorisierung – /api/sudoku/** frei, alles andere (Actuator) geschützt
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/sudoku/**").permitAll()
                .anyRequest().authenticated()
            )

            // 3) HTTP Basic als Fallback (für Actuator)
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}

