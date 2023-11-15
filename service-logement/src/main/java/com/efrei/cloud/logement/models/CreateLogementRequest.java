package com.efrei.cloud.logement.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateLogementRequest {
    private TypeLogement type;
    private int nbPieces;
    private int nbSurfaces;
    private EtatLogement etat;
    private String adresse;
    private String nomProprietaire;
    private String prenomProprietaire;
    private int prix;
    private Date dateDispo;
    private String ville;
}
