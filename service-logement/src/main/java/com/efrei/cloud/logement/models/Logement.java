package com.efrei.cloud.logement.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "logement")
public class Logement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code")
    private long code;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private TypeLogement type;

    @Column(name = "nbPieces")
    private Integer nbPieces;

    @Column(name = "nbSurfaces")
    private Integer nbSurfaces;

    @Column(name = "Etat")
    @Enumerated(EnumType.STRING)
    private EtatLogement etat;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "nomProprietaire")
    private String nomProprietaire;

    @Column(name = "prenomProprietaire")
    private String prenomProprietaire;

    @Column(name = "prix")
    private int prix;

    @Column(name = "dateDispo")
    private LocalDate dateDispo;

    @Column(name = "ville")
    private String ville;

}


