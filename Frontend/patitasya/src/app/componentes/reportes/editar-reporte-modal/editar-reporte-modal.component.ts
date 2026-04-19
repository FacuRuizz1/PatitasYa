import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetReportRequest, PetReportResponse } from '../../../models/Reporte';
import { ReporteService } from '../../../services/reporte.service';
import { PostType as PostTypeEnum } from '../../../models/enums';

@Component({
  selector: 'app-editar-reporte-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-reporte-modal.component.html',
  styleUrl: './editar-reporte-modal.component.css'
})
export class EditarReporteModalComponent implements OnInit {
  
    ngOnInit(): void {
    // Pre-poblar con los datos actuales
    this.form = {
      titulo: this.reporte.titulo,
      descripcion: this.reporte.descripcion,
      tipo: this.reporte.tipo,
      ubicacion: this.reporte.ubicacion,
      latitud: this.reporte.latitud,
      longitud: this.reporte.longitud,
    };
  }

  @Input() reporte!: PetReportResponse;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<PetReportResponse>();

  PostType = PostTypeEnum
  guardando = false;
  errorMessage = '';

  form!: PetReportRequest;

  constructor(private reporteService: ReporteService) {}

   onGuardar(): void {
    if (!this.form.titulo || !this.form.descripcion || !this.form.ubicacion) {
      this.errorMessage = 'Por favor completá todos los campos obligatorios.';
      return;
    }

    this.guardando = true;
    this.errorMessage = '';

    this.reporteService.updateReport(this.reporte.id, this.form).subscribe({
      next: (actualizado) => {
        this.guardando = false;
        this.guardado.emit(actualizado);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMessage = err.status === 403
          ? 'No tenés permisos para editar este reporte.'
          : 'Error al guardar los cambios. Intentá de nuevo.';
      }
    });
  }

  onCerrar(): void {
    this.cerrar.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onCerrar();
    }
  }
}
