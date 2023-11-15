package com.efrei.cloud.reservation.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateReservationRequest {
    private int idLocataire;
    private int idLogement;
    private Date dateDebut;
    private int duree;

}
