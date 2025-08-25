package com.basketballteam.basketball_app.security;

import com.basketballteam.basketball_app.security.dto.AuthRequest;
import com.basketballteam.basketball_app.security.dto.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final UserDetailsService uds;
    private final JwtService jwt;

    public AuthController(AuthenticationManager authManager, UserDetailsService uds, JwtService jwt) {
        this.authManager = authManager;
        this.uds = uds;
        this.jwt = jwt;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req) {
        var tokenReq =
                new UsernamePasswordAuthenticationToken(req.username(), req.password());
        authManager.authenticate(tokenReq);
        var user = uds.loadUserByUsername(req.username());
        String token = jwt.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(token));
    }
}

