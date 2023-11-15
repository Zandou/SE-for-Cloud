package com.efrei.cloud.logement.service;

import com.efrei.cloud.logement.exception.LogementNotFoundException;
import com.efrei.cloud.logement.models.CreateLogementRequest;
import com.efrei.cloud.logement.models.Logement;
import com.efrei.cloud.logement.models.TypeLogement;
import com.efrei.cloud.logement.repository.LogementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
public class LogementService {

    private final LogementRepository logementRepository;

    @Autowired
    public LogementService(LogementRepository LogementRepository) {
        this.logementRepository = LogementRepository;
    }

    public Logement createLogement(CreateLogementRequest createlogementRequest) {
        LocalDate date = createlogementRequest.getDateDispo().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Logement logement = Logement.builder()
                .type(createlogementRequest.getType())
                .nbPieces(createlogementRequest.getNbPieces())
                .nbSurfaces(createlogementRequest.getNbSurfaces())
                .etat(createlogementRequest.getEtat())
                .adresse(createlogementRequest.getAdresse())
                .nomProprietaire(createlogementRequest.getNomProprietaire())
                .prenomProprietaire(createlogementRequest.getPrenomProprietaire())
                .prix(createlogementRequest.getPrix())
                .dateDispo(date)
                .ville(createlogementRequest.getVille())
                .build();
        return logementRepository.save(logement);
    }

    public Logement getLogementByCode(Long id) {
        return logementRepository.findById(id)
                .orElseThrow(() -> new LogementNotFoundException(id));
    }

    public List<Logement> getLogementsByType(TypeLogement type) {
        return logementRepository.findByType(type);
    }

    public List<Logement> getLogementsByVille(String ville) {
        return logementRepository.findByVille(ville);
    }

    public List<Logement> getLogementsByByPrixBetween(int prixMin, int prixMax) {
        return logementRepository.findByPrixBetween(prixMin, prixMax);
    }

    public Logement updateLogementDateDispo(Long id, LocalDate dateDispo) {
        Logement logement = getLogementByCode(id);
        logement.setDateDispo(dateDispo);
        return logementRepository.save(logement);
    }
}
