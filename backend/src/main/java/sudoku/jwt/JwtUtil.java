package sudoku.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProperties props;
    private Key key;

    @PostConstruct
    void init() {
        this.key = Keys.hmacShaKeyFor(props.getSecret().getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(Date.from(
                        Instant.now().plus(props.getExpirationMinutes(), ChronoUnit.MINUTES)))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Validiert das Token und gibt den Username (Subject) zurück, wenn gültig.
     * Gibt null zurück, wenn das Token ungültig oder abgelaufen ist.
     */
    public String validateTokenAndRetrieveSubject(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (JwtException | IllegalArgumentException e) {
            System.out.println("JWT-Fehler: " + e.getClass().getSimpleName() + " – " + e.getMessage());
            return null;
        }
    }
}
