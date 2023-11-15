package com.efrei.cloud.logement.controller;

import com.efrei.cloud.logement.exception.ErrorResponse;
import com.efrei.cloud.logement.exception.LogementAlreadyExistException;
import com.efrei.cloud.logement.exception.LogementNotFoundException;
import com.efrei.cloud.logement.models.CreateLogementRequest;
import com.efrei.cloud.logement.models.Logement;
import com.efrei.cloud.logement.models.TypeLogement;
import com.efrei.cloud.logement.service.LogementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/logement")
public class LogementController {
    private final LogementService logementService;

    @Autowired
    public LogementController(LogementService LogementService) {
        this.logementService = LogementService;
    }

    @PostMapping
    public ResponseEntity<?> createLogement(@RequestBody CreateLogementRequest createLogementRequest) {
        try {
            Logement createdUser = logementService.createLogement(createLogementRequest);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (LogementAlreadyExistException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), 400);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLogementById(@PathVariable Long id) {
        try {
            Logement Logement = logementService.getLogementByCode(id);
            return new ResponseEntity<>(Logement, HttpStatus.OK);
        } catch (LogementNotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), 404);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/logements/type/{type}")
    public ResponseEntity<List<Logement>> getLogementsByType(@PathVariable TypeLogement type) {
        List<Logement> logements = logementService.getLogementsByType(type);
        return ResponseEntity.ok().body(logements);
    }

    @GetMapping("/logements/ville/{ville}")
    public ResponseEntity<List<Logement>> getLogementsByVille(@PathVariable String ville) {
        List<Logement> logements = logementService.getLogementsByVille(ville);
        return ResponseEntity.ok().body(logements);
    }

    @GetMapping("/logements/prix")
    public ResponseEntity<List<Logement>> getLogementsByPrixRange(@RequestParam int prixMax, @RequestParam int prixMin) {
        List<Logement> logements = logementService.getLogementsByByPrixBetween(prixMin, prixMax);
        return ResponseEntity.ok().body(logements);
    }

    @PutMapping("/{id}/date")
    public ResponseEntity<Logement> updateLogementDateDispo(@PathVariable Long id, @RequestParam String dateDispo) {
        LocalDate date = LocalDate.parse(dateDispo);
        Logement updatedLogement = logementService.updateLogementDateDispo(id, date);
        return ResponseEntity.ok(updatedLogement);
    }
}
