package org.patitasya.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.patitasya.enums.PostStatus;
import org.patitasya.enums.PostType;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetReportResponseDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private PostType tipo;
    private PostStatus estado;
    private String ubicacion;
    private LocalDateTime createdAt;

    private String usuarioNombre;
    private Long usuarioId;

    private List<String> fotos;
}
