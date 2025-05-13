// src/main/java/sudoku/config/SecurityConfig.java
package sudoku.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import sudoku.jwt.JwtFilter;

import java.util.List;


@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // CORS (wichtig für localhost:4200 → 8080)
            .cors(Customizer.withDefaults())

            // CSRF brauchst du für reine Token-APIs nicht
            .csrf(csrf -> csrf.disable())

            // Jedes Request wird als stateless betrachtet
            .sessionManagement(sm ->
                    sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Keine Form-Login- oder Basic-Auth-Seite erzeugen
            .formLogin(fl -> fl.disable())
            .httpBasic(basic -> basic.disable())

            //401 statt 302
            .exceptionHandling(e -> e
                 .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
            
            // Zugriffsregeln
            .authorizeHttpRequests(auth -> auth
                // Login-Endpunkt frei
                .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                //Smoke Test
                .requestMatchers(HttpMethod.GET, "/api/ping").permitAll()
                // alles Weitere nur mit gültigem JWT
                .anyRequest().authenticated());

        // Unser Filter VOR UsernamePasswordAuthenticationFilter einhängen
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        var config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:4200"));
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
