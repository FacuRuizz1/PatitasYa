package org.patitasya.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.patitasya.enums.PostType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetReportRequestDTO {

    @NotBlank(message = "El titulo es obligatorio")
    private String titulo;

    @NotBlank(message = "La descripcion es obligatoria")
    private String descripcion;

    @NotNull
    private PostType tipo;

    @NotBlank(message = "La ubicacion es obligatoria")
    private String ubicacion;

    private Double latitud;
    private Double longitud;
}
