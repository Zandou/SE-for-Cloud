package com.efrei.cloud.user.repository;

import com.efrei.cloud.user.models.Proprietaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProprietaireRepository extends JpaRepository<Proprietaire, Long> {
    Optional<Proprietaire> findByEmailAndMotDePasse(String email, String motDePasse);

}
