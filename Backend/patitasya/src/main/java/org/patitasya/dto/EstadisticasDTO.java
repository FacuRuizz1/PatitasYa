package org.patitasya.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstadisticasDTO {
    private long perdidas;
    private long encontradas;
    private long adopciones;
    private long total;
    private String periodo;
    private long perdidasResueltas;
    private double tasaResolucion;
}
