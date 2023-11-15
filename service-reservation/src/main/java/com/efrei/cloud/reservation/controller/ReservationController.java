package com.efrei.cloud.reservation.controller;

import com.efrei.cloud.reservation.exception.ErrorResponse;
import com.efrei.cloud.reservation.exception.LocataireNotFoundException;
import com.efrei.cloud.reservation.exception.LogementNotAvailableException;
import com.efrei.cloud.reservation.exception.LogementNotFoundException;
import com.efrei.cloud.reservation.models.CreateReservationRequest;
import com.efrei.cloud.reservation.models.Reservation;
import com.efrei.cloud.reservation.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/reservation")
public class ReservationController {
    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService ReservationService) {
        this.reservationService = ReservationService;
    }



    @PostMapping("/ask")
    public ResponseEntity<?> reservationLogement(@RequestBody CreateReservationRequest reservationRequest) {
        try {
            Reservation reservation = reservationService.reserverLogement(reservationRequest);
            return new ResponseEntity<>(reservation, HttpStatus.CREATED);
        } catch (LocataireNotFoundException | LogementNotFoundException | LogementNotAvailableException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), 400);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }
}
