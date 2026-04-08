package org.patitasya.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.patitasya.enums.PostStatus;
import org.patitasya.enums.PostType;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pets_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descripcion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PostType tipo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PostStatus estado;

    @Column(nullable = false, length = 150)
    private String ubicacion;

    private Double latitud;

    private Double longitud;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    //Relacion con Usuario
    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id",nullable = false)
    private Usuario usuario;

    //Relacion con fotos
    @OneToMany(mappedBy = "petReport", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PetPhoto> fotos;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if (this.estado == null) this.estado = PostStatus.ACTIVA;
    }
}
