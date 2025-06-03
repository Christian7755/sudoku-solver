package sudoku.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sudoku.auth.AuthProperties;

/* === simple DTO für den Request-Body =================== */
record AuthRequest(String username, String password) {}

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;
    private final AuthProperties authProps;
    private final PasswordEncoder encoder;     // z. B. NoOp- oder BCrypt-Encoder

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest req) {

        //for Debbuging
        System.out.println("Angekommen mit: " + req);
        if (req != null) {
        System.out.println("Username: " + req.username());
        System.out.println("Passwort: " + req.password());
        } else {
            System.out.println("Request ist null!");
        }


        String stored = authProps.getUsers().get(req.username());
        boolean ok = stored != null && encoder.matches(req.password(), stored);

        if (ok) {
            String token = jwtUtil.generateToken(req.username());
            return ResponseEntity.ok(token);           // JWT zurück
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body("Invalid credentials");
    }
}
