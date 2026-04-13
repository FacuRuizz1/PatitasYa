package org.patitasya.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.patitasya.dto.PetReportRequestDTO;
import org.patitasya.dto.PetReportResponseDTO;
import org.patitasya.enums.PostStatus;
import org.patitasya.enums.PostType;
import org.patitasya.service.PetReportService;
import org.springframework.http.MediaType;
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


    @PostMapping(value = "/{reportId}/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Subir imagen a un reporte")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE,
                    schema = @Schema(type = "object"),
                    schemaProperties = {
                            @SchemaProperty(name = "file",
                                    schema = @Schema(type = "string", format = "binary"))
                    }
            )
    )
    public ResponseEntity<String> uploadImage(
            @PathVariable Long reportId,
            @RequestPart("file") MultipartFile file
    ) {
        return ResponseEntity.ok(
                petReportService.uploadImage(reportId, file)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetReportResponseDTO> obtenerReportePorId(@PathVariable Long id){
        return ResponseEntity.ok(petReportService.getReportById(id));
    }

}
