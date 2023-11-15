package com.efrei.cloud.reservation.service;

import com.efrei.cloud.reservation.exception.LocataireNotFoundException;
import com.efrei.cloud.reservation.exception.LogementNotAvailableException;
import com.efrei.cloud.reservation.exception.LogementNotFoundException;
import com.efrei.cloud.reservation.models.CreateReservationRequest;
import com.efrei.cloud.reservation.models.Reservation;
import com.efrei.cloud.reservation.models.logement.Logement;
import com.efrei.cloud.reservation.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;


@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, RestTemplate restTemplate) {
        this.reservationRepository = reservationRepository;
        this.restTemplate = restTemplate;
    }


    public Reservation reserverLogement(CreateReservationRequest reservationRequest) {
        // Check if locataire exist
        if (!checkIfLocataireExists(reservationRequest.getIdLocataire())) {
            throw new LocataireNotFoundException(reservationRequest.getIdLocataire());
        }

        // Check if logement exist
        Logement logement = getLogement(reservationRequest.getIdLogement());
        if (logement == null) {
            throw new LogementNotFoundException(reservationRequest.getIdLogement());
        }

        LocalDate date = reservationRequest.getDateDebut().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        // Check if logement is available
        if (!checkIfLogementIsAvailable(date, logement)) {
            throw new LogementNotAvailableException(date);
        }

        Reservation reservation = Reservation.builder()
                .idLocataire(reservationRequest.getIdLocataire())
                .idLogement(reservationRequest.getIdLogement())
                .dateDebut(date)
                .duree(reservationRequest.getDuree())
                .build();

        // Update date of the logement
        LocalDate newDate = date.plusDays(reservationRequest.getDuree());
        updateDateAvailableLogement(newDate, reservationRequest.getIdLogement());

        return reservationRepository.save(reservation);
    }

    private boolean checkIfLocataireExists(long id) {
        String url = "http://localhost:8888/users/locataires/" + id;
        ResponseEntity<Void> response = restTemplate.getForEntity(url, Void.class);
        return response.getStatusCode() == HttpStatus.OK;
    }

    private Logement getLogement(long id) {
        String url = "http://localhost:8080/logement/" + id;
        return restTemplate.getForObject(url, Logement.class);
    }

    private boolean checkIfLogementIsAvailable(LocalDate dateRequest, Logement logement) {
        return dateRequest.isAfter(logement.getDateDispo());
    }

    private void updateDateAvailableLogement(LocalDate dateDispo, int logementId) {
        String url = "http://localhost:8080/logement/" + logementId + "/date?dateDispo=" + dateDispo;
        Map<String, String> requestObject = new HashMap<>();
        requestObject.put("logementId", String.valueOf(logementId));
        requestObject.put("dateDispo", String.valueOf(dateDispo));
        restTemplate.put(url, requestObject);
    }
}
