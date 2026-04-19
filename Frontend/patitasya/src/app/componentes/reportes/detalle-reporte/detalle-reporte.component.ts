import { Component, OnInit } from '@angular/core';
import { PetReportResponse, PostTypeLabels } from '../../../models/Reporte';
import { PostType } from '../../../models/enums';
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
  mostrarModalEditar = false;

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

  abrirModal(foto: string): void {
    window.open(foto, '_blank');
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
      alert('¡Enlace copiado al portapapeles!');
    }
  }

  contactar(): void {
    if (this.reporte?.usuarioNombre) {
      alert(`Para contactar al usuario "${this.reporte.usuarioNombre}" implementá aquí el sistema de mensajería.`);
    }
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
      background: '#2A1E14',
      color: '#F5EFE6',
      confirmButtonColor: '#F28B6E',
      cancelButtonColor: '#3D2E1E',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reporteService.deleteReport(this.reporte!.id).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El reporte fue eliminado correctamente.',
              icon: 'success',
              background: '#2A1E14',
              color: '#F5EFE6',
              confirmButtonColor: '#5ED4A0',
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
              background: '#2A1E14',
              color: '#F5EFE6',
              confirmButtonColor: '#5ED4A0',
            });
          }
        });
      }
    });
  }
}