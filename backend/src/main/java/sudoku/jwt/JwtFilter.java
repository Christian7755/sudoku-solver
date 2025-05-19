package sudoku.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    // Liste aller Pfade, die ohne Authentifizierung erlaubt sein sollen
    private static final List<String> PUBLIC_PATHS = List.of(
            "/api/auth/login",
            "/api/ping",
            "/api/sudoku/generate",
            "/api/sudoku/solve"
    );

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        System.out.println("Incoming path: " + request.getRequestURI());
        System.out.println("Auth header: " + request.getHeader("Authorization"));


        // Frühzeitig durchlassen, wenn der Pfad öffentlich ist
        if (PUBLIC_PATHS.stream().anyMatch(path::startsWith)) {
            System.out.println("Skipping JWT check for: " + path);
            filterChain.doFilter(request, response);
            return;
        }

        // CORS Preflight-Request
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String username = jwtUtil.validateTokenAndRetrieveSubject(token);

            if (username != null) {
                var authToken = new UsernamePasswordAuthenticationToken(
                        username, null, Collections.emptyList());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
