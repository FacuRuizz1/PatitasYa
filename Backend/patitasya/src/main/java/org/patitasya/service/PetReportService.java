package org.patitasya.service;

import org.patitasya.dto.PetReportRequestDTO;
import org.patitasya.dto.PetReportResponseDTO;
import org.patitasya.enums.PostStatus;
import org.patitasya.enums.PostType;

import java.util.List;

public interface PetReportService {

    PetReportResponseDTO createReport(PetReportRequestDTO dto, Long usuarioId);
    List<PetReportResponseDTO> getAllReports();
    List<PetReportResponseDTO> getReportsByType(PostType tipo);
    List<PetReportResponseDTO> getReportsByStatus(PostStatus estado);
    List<PetReportResponseDTO> getReportsByUser(Long usuarioId);
}
