import { Component, OnInit } from '@angular/core';
import { PetReportResponse, PostTypeLabels } from '../../../models/Reporte';
import { PostStatus, PostType } from '../../../models/enums';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReporteService } from '../../../services/reporte.service';
import { CommonModule } from '@angular/common';
import { EditarReporteModalComponent } from '../editar-reporte-modal/editar-reporte-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-reporte',
  standalone: true,
  imports: [CommonModule, RouterLink, EditarReporteModalComponent],
  templateUrl: './detalle-reporte.component.html',
  styleUrl: './detalle-reporte.component.css'
})
export class DetalleReporteComponent implements OnInit {

  reporte: PetReportResponse | null = null;
  loading: boolean = true;
  errorMessage: string = '';
  tipoLabels = PostTypeLabels;
  PostType = PostType;
  PostStatus = PostStatus;
  mostrarModalEditar = false;

  modalFotoVisible = false;
  fotoActualIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reporteService: ReporteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.cargarReporte(id);
    } else {
      this.errorMessage = 'ID de reporte no válido';
      this.loading = false;
    }
  }

  cargarReporte(id: number): void {
    this.loading = true;
    this.reporteService.getReporteById(id).subscribe({
      next: (data) => {
        this.reporte = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar reporte:', error);
        this.errorMessage = error.status === 404
          ? 'Reporte no encontrado'
          : 'Error al cargar el reporte';
        this.loading = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/reportes']);
  }

  getColorPorTipo(tipo: PostType): string {
    switch (tipo) {
      case PostType.PERDIDA: return '#c62828';
      case PostType.ENCONTRADA: return '#2e7d32';
      case PostType.ADOPCION: return '#f57c00';
      default: return '#7f8c8d';
    }
  }

  getIconoPorTipo(tipo: PostType): string {
    switch (tipo) {
      case PostType.PERDIDA: return '🐾';
      case PostType.ENCONTRADA: return '🏡';
      case PostType.ADOPCION: return '🐶';
      default: return '🐾';
    }
  }

  getMensajeAyuda(tipo: PostType): string {
    switch (tipo) {
      case PostType.PERDIDA:
        return 'Si tenés información sobre esta mascota, por favor contactate con el dueño.';
      case PostType.ENCONTRADA:
        return 'Si reconocés esta mascota o sos el dueño, contactate con quien la encontró.';
      case PostType.ADOPCION:
        return 'Si estás interesado en adoptar, contactate con el responsable para más información.';
      default:
        return 'Compartí esta publicación para ayudar a encontrar a esta mascota.';
    }
  }

  abrirModal(index: number): void {
  this.fotoActualIndex = index;
  this.modalFotoVisible = true;
  }

  cerrarModalFoto(): void {
  this.modalFotoVisible = false;
  }

  fotoAnterior(): void {
  if (this.fotoActualIndex > 0) {
    this.fotoActualIndex--;
  }
}

fotoSiguiente(): void {
  if (!this.reporte?.fotos) return;
  if (this.fotoActualIndex < this.reporte.fotos.length - 1) {
    this.fotoActualIndex++;
  }
}

  compartir(): void {
  if (navigator.share) {
    navigator.share({
      title: this.reporte?.titulo,
      text: this.reporte?.descripcion,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    Swal.fire({
      title: '¡Enlace copiado!',
      icon: 'success',
      background: '#2A1E14',
      color: '#F5EFE6',
      confirmButtonColor: '#5ED4A0',
      timer: 1500,
      showConfirmButton: false,
    });
  }
}

 contactar(): void {
  const email = this.reporte?.usuarioEmail;
  if (!email) {
    Swal.fire({
      title: 'Sin contacto disponible',
      text: 'Este usuario no tiene email registrado.',
      icon: 'info',
      background: '#2A1E14',
      color: '#F5EFE6',
      confirmButtonColor: '#5ED4A0',
    });
    return;
  }

  const asunto = encodeURIComponent(`Consulta sobre: ${this.reporte?.titulo}`);
  const cuerpo = encodeURIComponent(
    `Hola ${this.reporte?.usuarioNombre}, vi tu reporte "${this.reporte?.titulo}" en Patitasya y me gustaría contactarme.`
  );

  window.open(`mailto:${email}?subject=${asunto}&body=${cuerpo}`);
}

  abrirModalEditar(): void {
    this.mostrarModalEditar = true;
  }

  onModalCerrado(): void {
    this.mostrarModalEditar = false;
  }

  onReporteGuardado(reporteActualizado: PetReportResponse): void {
    this.reporte = reporteActualizado;
    this.mostrarModalEditar = false;
  }

 eliminarReporte(): void {
    Swal.fire({
      title: '¿Eliminar reporte?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reporteService.deleteReport(this.reporte!.id).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El reporte fue eliminado correctamente.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
              this.router.navigate(['/reportes']);
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: err.status === 403
                ? 'No tenés permisos para eliminar este reporte.'
                : 'Ocurrió un error al eliminar.',
              icon: 'error',
            });
          }
        });
      }
    });
  }

  marcarComoResuelta(): void {
  if (!this.reporte) return;

  Swal.fire({
    title: '¿Marcar como resuelta?',
    text: 'Esto indica que la mascota fue encontrada o el caso se resolvió.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, marcar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.reporteService.updateReportStatus(this.reporte!.id, 'RESUELTA').subscribe({
        next: (actualizado) => {
          this.reporte = actualizado;
          Swal.fire({
            title: '¡Resuelta!',
            text: 'El reporte fue marcado como resuelto.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err.status === 403
              ? 'No tenés permisos para esta acción.'
              : 'Error al actualizar el estado.',
            icon: 'error',
          });
        }
      });
    }
  });
}
}