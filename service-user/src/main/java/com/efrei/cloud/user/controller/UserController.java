package com.efrei.cloud.user.controller;

import com.efrei.cloud.user.exception.ErrorResponse;
import com.efrei.cloud.user.exception.UserAlreadyExistException;
import com.efrei.cloud.user.exception.UserNotFoundException;
import com.efrei.cloud.user.models.CreateUserRequest;
import com.efrei.cloud.user.models.Locataire;
import com.efrei.cloud.user.models.Proprietaire;
import com.efrei.cloud.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("locataire")
    public ResponseEntity<?> createLocataire(@RequestBody CreateUserRequest createUserRequest) {
        try {
            Locataire createdUser = userService.createLocataire(createUserRequest);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (UserAlreadyExistException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), 400);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("proprietaire")
    public ResponseEntity<?> createProprietaire(@RequestBody CreateUserRequest createUserRequest) {
        try {
            Proprietaire createdUser = userService.createProprietaire(createUserRequest);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (UserAlreadyExistException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), 400);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }
    
    @CrossOrigin(origins = "http://localhost:3000")

    @GetMapping("/locataires/{id}")
    public ResponseEntity<?> getLocataireById(@PathVariable Long id) {
        try {
            Locataire locataire = userService.getLocataireById(id);
            return new ResponseEntity<>(locataire, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), 404);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")

    @GetMapping("/proprietaire/{id}")
    public ResponseEntity<?> getProprietaireById(@PathVariable Long id) {
        try {
            Proprietaire proprietaire = userService.getProprietaireById(id);
            return new ResponseEntity<>(proprietaire, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), 404);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")

    @GetMapping("/locataire/{email}/{password}")
    public ResponseEntity<?> getLocataireByEmailAndPassword(@PathVariable String email, @PathVariable String password) {
        try {
            Locataire locataire = userService.getLocataireByEmailAndPassword(email, password);
            return ResponseEntity.ok(locataire);
        } catch (UserNotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), 404);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
    
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/proprietaire/{email}/{password}")
    public ResponseEntity<?> getProprietaireByEmailAndPassword(@PathVariable String email, @PathVariable String password) {
        try {
            Proprietaire proprietaire = userService.getProprietaireByEmailAndPassword(email, password);
            return ResponseEntity.ok(proprietaire);
        } catch (UserNotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), 404);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
}
