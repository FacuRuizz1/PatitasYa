package org.patitasya.repository;

import org.patitasya.entity.PetPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetPhotoRepository extends JpaRepository<PetPhoto,Long> {
    List<PetPhoto> findByPetReportId(Long petReportId);
}
