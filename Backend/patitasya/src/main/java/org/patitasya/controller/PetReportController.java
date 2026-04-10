package org.patitasya.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.patitasya.dto.PetReportRequestDTO;
import org.patitasya.dto.PetReportResponseDTO;
import org.patitasya.enums.PostStatus;
import org.patitasya.enums.PostType;
import org.patitasya.service.PetReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class PetReportController {

    private final PetReportService petReportService;

    @PostMapping("/crear")
    public ResponseEntity<PetReportResponseDTO> registrarReporte(@RequestBody @Valid PetReportRequestDTO dto){

        PetReportResponseDTO response = petReportService.createReport(dto);
        return ResponseEntity.status(201).body(response);

    }

    @GetMapping("/listar")
    public ResponseEntity<List<PetReportResponseDTO>> listarTodosLosReportes(){
        return ResponseEntity.ok(petReportService.getAllReports());
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<PetReportResponseDTO>> obtenerReportePorTipo(@PathVariable PostType tipo){
        return ResponseEntity.ok(petReportService.getReportsByType(tipo));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<PetReportResponseDTO>> obtenerReportePorEstado(@PathVariable PostStatus estado){
        return ResponseEntity.ok(petReportService.getReportsByStatus(estado));
    }

    //Obtener reportes por usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<PetReportResponseDTO>> obtenerReportesPorUsuario(@PathVariable Long usuarioId){
        return ResponseEntity.ok(petReportService.getReportsByUser(usuarioId));
    }

    @PostMapping("/{reportId}/upload")
    public ResponseEntity<String> uploadImage(
            @PathVariable Long reportId,
            @RequestParam("file") MultipartFile file
    ) {
        return ResponseEntity.ok(
                petReportService.uploadImage(reportId, file)
        );
    }

}
