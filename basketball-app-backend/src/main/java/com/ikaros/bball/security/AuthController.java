package com.ikaros.bball.security;

import com.ikaros.bball.security.dto.AuthRequest;
import com.ikaros.bball.security.dto.AuthResponse;
import com.ikaros.bball.security.dto.SignupRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.AuthenticationException;

import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final UserDetailsService uds;
    private final JwtService jwt;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authManager, UserDetailsService uds, JwtService jwt, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.authManager = authManager;
        this.uds = uds;
        this.jwt = jwt;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        var tokenReq =
                new UsernamePasswordAuthenticationToken(req.username(), req.password());
        try {
            authManager.authenticate(tokenReq);
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }
        var user = uds.loadUserByUsername(req.username());
        String token = jwt.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }

        User user = new User();
        user.setName(req.name());
        user.setSurname(req.surname());
        user.setEmail(req.email());
        user.setPhone(req.phone());
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setRole(Role.USER); // or whatever your default role is

        userRepository.save(user);

        return ResponseEntity.created(URI.create("/api/auth/login")).build();
    }
}

