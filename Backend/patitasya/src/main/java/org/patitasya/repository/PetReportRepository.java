package org.patitasya.repository;

import org.patitasya.entity.PetReport;
import org.patitasya.enums.PostStatus;
import org.patitasya.enums.PostType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PetReportRepository extends JpaRepository<PetReport,Long> {

    List<PetReport> findByTipo(PostType tipo);
    List<PetReport> findByEstado(PostStatus estado);
    List<PetReport> findByUsuarioId(Long usuarioId);

    Optional<PetReport> findById(Long id);

    long countByTipo(PostType tipo);
}
