package com.stocktracker.backend.controller;

import com.stocktracker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {


    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final HttpSessionSecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();

    @Autowired
    public UserController(AuthenticationManager authenticationManager, UserService userService, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        Authentication authenticationRequest =
                UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.email(), loginRequest.password());
        Authentication authenticationResponse =
                this.authenticationManager.authenticate(authenticationRequest);

        // Set the authenticated user in the SecurityContext
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authenticationResponse);
        SecurityContextHolder.setContext(securityContext);

        // Store the SecurityContext in the HttpSession
        securityContextRepository.saveContext(securityContext, request, null);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest registerRequest) {
        // Verifica si el usuario ya existe
        if (userService.existsByEmail(registerRequest.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El email ya está registrado.");
        }

        // Crea y guarda el nuevo usuario
        userService.addUser(registerRequest.username(), registerRequest.email(), passwordEncoder.encode(registerRequest.password()));
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente.");
    }

    public record LoginRequest(String email, String password) {
    }

    public record RegisterRequest(String username, String email, String password) {}
}
