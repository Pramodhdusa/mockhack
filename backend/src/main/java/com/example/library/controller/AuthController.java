package com.example.library.controller;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.example.library.entity.User;
import com.example.library.service.UserService;
import com.example.library.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository; // ✅ FIX

    // Registration API
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userService.register(user);
        return "User Registered Successfully";
    }

    // Login API
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user) {

    Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

    if (optionalUser.isPresent() &&
        optionalUser.get().getPassword().equals(user.getPassword())) {

        User existingUser = optionalUser.get();

        HashMap<String, String> response = new HashMap<>();
        response.put("message", "Login Success");
        response.put("role", existingUser.getRole());

        return ResponseEntity.ok(response);

    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid credentials");
    }
}
}