package org.patitasya.service;

import org.patitasya.dto.PetReportRequestDTO;
import org.patitasya.dto.PetReportResponseDTO;
import org.patitasya.enums.PostStatus;
import org.patitasya.enums.PostType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PetReportService {

    PetReportResponseDTO createReport(PetReportRequestDTO dto);
    List<PetReportResponseDTO> getAllReports();
    PetReportResponseDTO getReportById(Long id);
    List<PetReportResponseDTO> getReportsByType(PostType tipo);
    List<PetReportResponseDTO> getReportsByStatus(PostStatus estado);
    List<PetReportResponseDTO> getReportsByUser(Long usuarioId);
    void deleteReport(Long reportId);

    String uploadImage(Long reportId, MultipartFile file);
}
