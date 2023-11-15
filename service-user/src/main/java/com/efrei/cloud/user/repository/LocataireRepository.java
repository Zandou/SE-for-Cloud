package com.efrei.cloud.user.repository;

import com.efrei.cloud.user.models.Locataire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocataireRepository extends JpaRepository<Locataire, Long> {
    Optional<Locataire> findByEmailAndMotDePasse(String email, String motDePasse);

}
