package com.ikaros.bball.security;

import com.ikaros.bball.security.dto.AuthRequest;
import com.ikaros.bball.security.dto.AuthResponse;
import com.ikaros.bball.security.dto.SignupRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.AuthenticationException;

import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtService jwt;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authManager, JwtService jwt, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.authManager = authManager;
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
        var userOpt = userRepository.findByEmail(req.username());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }
        var user = userOpt.get();
        if (user.getRole() == Role.ADMIN) {
            if (req.name() == null || !req.name().equals(user.getName())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid admin name");
            }
        }
        String token = jwt.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        if (userRepository.existsByEmailIgnoreCase(req.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }
        if (userRepository.existsByPhone(req.phone())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Phone already registered");
        }

        User user = new User();
        user.setName(req.name());
        user.setSurname(req.surname());
        user.setEmail(req.email().toLowerCase());
        user.setPhone(req.phone());
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setRole(Role.USER);

        userRepository.save(user);

        return ResponseEntity.created(URI.create("/api/auth/login")).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/signup/admin")
    public ResponseEntity<?> signupAdmin(@RequestBody SignupRequest req) {
        if (userRepository.existsByEmailIgnoreCase(req.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }
        if (userRepository.existsByPhone(req.phone())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Phone already registered");
        }

        User user = new User();
        user.setName(req.name());
        user.setSurname(req.surname());
        user.setEmail(req.email().toLowerCase());
        user.setPhone(req.phone());
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setRole(Role.ADMIN);

        userRepository.save(user);

        return ResponseEntity.created(URI.create("/api/auth/login")).build();
    }
}

