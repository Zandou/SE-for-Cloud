package com.efrei.cloud.user.service;

import com.efrei.cloud.user.exception.UserAlreadyExistException;
import com.efrei.cloud.user.exception.UserNotFoundException;
import com.efrei.cloud.user.models.CreateUserRequest;
import com.efrei.cloud.user.models.Locataire;
import com.efrei.cloud.user.models.Proprietaire;
import com.efrei.cloud.user.repository.LocataireRepository;
import com.efrei.cloud.user.repository.ProprietaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final LocataireRepository locataireRepository;
    private final ProprietaireRepository proprietaireRepository;

    @Autowired
    public UserService(LocataireRepository locataireRepository, ProprietaireRepository proprietaireRepository) {
        this.locataireRepository = locataireRepository;
        this.proprietaireRepository = proprietaireRepository;
    }

    public Locataire createLocataire(CreateUserRequest createUserRequest) {
        try {
            if (getLocataireById(createUserRequest.getId()) != null) {
                throw new UserAlreadyExistException(createUserRequest.getId());
            }
        } catch (UserNotFoundException e) {
            Locataire user = Locataire.builder()
                    .id(createUserRequest.getId())
                    .email(createUserRequest.getEmail())
                    .nom(createUserRequest.getNom())
                    .telephone(createUserRequest.getTelephone())
                    .motDePasse(createUserRequest.getMot_de_passe())
                    .build();
            return locataireRepository.save(user);
        }
        return null;
    }

    public Proprietaire createProprietaire(CreateUserRequest createUserRequest) {
        try {
            if (getProprietaireById(createUserRequest.getId()) != null) {
                throw new UserAlreadyExistException(createUserRequest.getId());
            }
        } catch (UserNotFoundException e) {
            Proprietaire proprietaire = Proprietaire.builder()
                    .id(createUserRequest.getId())
                    .email(createUserRequest.getEmail())
                    .nom(createUserRequest.getNom())
                    .telephone(createUserRequest.getTelephone())
                    .motDePasse(createUserRequest.getMot_de_passe())
                    .build();

            return proprietaireRepository.save(proprietaire);
        }
        return null;
    }

    public Locataire getLocataireById(Long id) {
        return locataireRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public Proprietaire getProprietaireById(Long id) {
        return proprietaireRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public Locataire getLocataireByEmailAndPassword(String email, String password) {
        return locataireRepository.findByEmailAndMotDePasse(email, password).orElseThrow(UserNotFoundException::new);
    }
    public Proprietaire getProprietaireByEmailAndPassword(String email, String password) {
        return proprietaireRepository.findByEmailAndMotDePasse(email, password).orElseThrow(UserNotFoundException::new);
    }
}


