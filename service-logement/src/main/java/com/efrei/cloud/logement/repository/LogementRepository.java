package com.efrei.cloud.logement.repository;

import com.efrei.cloud.logement.models.Logement;
import com.efrei.cloud.logement.models.TypeLogement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogementRepository extends JpaRepository<Logement, Long> {
    List<Logement> findByType(TypeLogement type);
    List<Logement> findByVille(String ville);
    List<Logement> findByPrixBetween(int prixMax, int prixMin);

}
