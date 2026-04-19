package org.patitasya.service.Impl;

import lombok.RequiredArgsConstructor;
import org.patitasya.dto.PetReportRequestDTO;
import org.patitasya.dto.PetReportResponseDTO;
import org.patitasya.entity.PetPhoto;
import org.patitasya.entity.PetReport;
import org.patitasya.entity.Usuario;
import org.patitasya.enums.PostStatus;
import org.patitasya.enums.PostType;
import org.patitasya.repository.PetPhotoRepository;
import org.patitasya.repository.PetReportRepository;
import org.patitasya.repository.UsuarioRepository;
import org.patitasya.security.SecurityUtils;
import org.patitasya.service.CloudinaryService;
import org.patitasya.service.PetReportService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetReportServiceImpl implements PetReportService {

    private final PetReportRepository petReportRepository;
    private final UsuarioRepository usuarioRepository;
    private final CloudinaryService cloudinaryService;
    private final PetPhotoRepository petPhotoRepository;

    @Override
    public PetReportResponseDTO createReport(PetReportRequestDTO dto) {
        /*
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

         */

        Usuario usuario = SecurityUtils.getCurrentUser();

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
    public PetReportResponseDTO getReportById(Long id) {
        PetReport report = petReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado"));
        return mapToResponse(report);
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

    @Override
    public PetReportResponseDTO updateReport(Long id, PetReportRequestDTO dto) {
        PetReport report = petReportRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Reporte no encontrado"));

        Usuario usuario = SecurityUtils.getCurrentUser();
        validarPermiso(report, usuario);

        // Actualizar campos
        report.setTitulo(dto.getTitulo());
        report.setDescripcion(dto.getDescripcion());
        report.setTipo(dto.getTipo());
        report.setUbicacion(dto.getUbicacion());
        report.setLatitud(dto.getLatitud());
        report.setLongitud(dto.getLongitud());

        PetReport actualizado = petReportRepository.save(report);
        return mapToResponse(actualizado);
    }

    @Override
    public PetReportResponseDTO updateReportStatus(Long id, PostStatus status) {
        PetReport report = petReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado"));

        Usuario usuario = SecurityUtils.getCurrentUser();
        validarPermiso(report, usuario);

        report.setEstado(status);
        PetReport updated = petReportRepository.save(report);
        return mapToResponse(updated);
    }

    @Override
    public void deleteReport(Long reportId) {
        PetReport report = petReportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado"));

        Usuario usuario = SecurityUtils.getCurrentUser();

        validarPermiso(report, usuario);

        petReportRepository.delete(report);
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

    private void validarPermiso(PetReport report, Usuario usuario) {

        // ADMIN puede todo
        if (usuario.getRol().name().equals("ADMIN")) return;

        // Si no es dueño → error
        if (!report.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("No tenés permisos para esta acción");
        }
    }

    @Override
    public String uploadImage(Long reportId, MultipartFile file) {

        PetReport report = petReportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado"));

        Usuario usuario = SecurityUtils.getCurrentUser();

        validarPermiso(report, usuario);

        String url = cloudinaryService.uploadFile(file);

        PetPhoto photo = PetPhoto.builder()
                .imagenUrl(url)
                .petReport(report)
                .build();

        petPhotoRepository.save(photo);

        return url;
    }
}
