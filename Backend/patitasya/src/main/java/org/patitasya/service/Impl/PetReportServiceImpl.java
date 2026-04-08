package org.patitasya.service.Impl;

import lombok.RequiredArgsConstructor;
import org.patitasya.dto.PetReportRequestDTO;
import org.patitasya.dto.PetReportResponseDTO;
import org.patitasya.entity.PetPhoto;
import org.patitasya.entity.PetReport;
import org.patitasya.entity.Usuario;
import org.patitasya.enums.PostStatus;
import org.patitasya.enums.PostType;
import org.patitasya.repository.PetReportRepository;
import org.patitasya.repository.UsuarioRepository;
import org.patitasya.service.PetReportService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetReportServiceImpl implements PetReportService {

    private final PetReportRepository petReportRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public PetReportResponseDTO createReport(PetReportRequestDTO dto, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        PetReport petReport = PetReport.builder()
                .titulo(dto.getTitulo())
                .descripcion(dto.getDescripcion())
                .tipo(dto.getTipo())
                .ubicacion(dto.getUbicacion())
                .latitud(dto.getLatitud())
                .longitud(dto.getLongitud())
                .estado(PostStatus.ACTIVA)
                .usuario(usuario)
                .build();

        PetReport saved = petReportRepository.save(petReport);

        return mapToResponse(saved);

    }

    @Override
    public List<PetReportResponseDTO> getAllReports() {
        return petReportRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

    }

    @Override
    public List<PetReportResponseDTO> getReportsByType(PostType tipo) {
        return petReportRepository.findByTipo(tipo)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PetReportResponseDTO> getReportsByStatus(PostStatus estado) {
        return petReportRepository.findByEstado(estado)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PetReportResponseDTO> getReportsByUser(Long usuarioId) {
        return petReportRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private PetReportResponseDTO mapToResponse(PetReport report) {

        List<String> fotos = report.getFotos() != null
                ? report.getFotos().stream()
                .map(PetPhoto::getImagenUrl)
                .collect(Collectors.toList())
                : List.of();

        return PetReportResponseDTO.builder()
                .id(report.getId())
                .titulo(report.getTitulo())
                .descripcion(report.getDescripcion())
                .tipo(report.getTipo())
                .estado(report.getEstado())
                .ubicacion(report.getUbicacion())
                .createdAt(report.getCreatedAt())
                .usuarioNombre(report.getUsuario().getNombre())
                .fotos(fotos)
                .build();
    }
}
