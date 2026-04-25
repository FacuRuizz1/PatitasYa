import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PetReportResponse, PostStatusLabels, PostTypeLabels } from '../../../models/Reporte';
import { PostType } from '../../../models/enums';
import { ReporteService } from '../../../services/reporte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-reportes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-reportes.component.html',
  styleUrl: './listar-reportes.component.css'
})
export class ListarReportesComponent {

  reportes: PetReportResponse[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  filtroTipo: string = 'todos';
  tipos = PostType;

  tiposLabels = PostTypeLabels;
  statusLabels = PostStatusLabels;


  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes(): void {
    this.loading = true;
    this.reporteService.getAllReports().subscribe({
      next: (data) => {
        this.reportes = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar reportes:', error);
        this.loading = false;
        Swal.fire({
          title: 'Error al cargar los reportes',
          text: 'No se pudieron cargar los reportes. Intenta de nuevo más tarde.',
          icon: 'error',
          confirmButtonColor: 'var(--primary-color)'
        });
      }
    });
  }

   filtrarPorTipo(tipo: string): void {
    this.filtroTipo = tipo;
    if (tipo === 'todos') {
      this.cargarReportes();
    } else {
      this.loading = true;
      this.reporteService.getReportsByType(tipo).subscribe({
        next: (data) => {
          this.reportes = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al filtrar:', error);
          this.loading = false;
          Swal.fire({
            title: 'Error al filtrar',
            text: 'No se pudieron filtrar los reportes. Intenta de nuevo.',
            icon: 'error',
            confirmButtonColor: 'var(--primary-color)'
          });
        }
      });
    }
  }

  getColorPorTipo(tipo: PostType): string {
    switch(tipo) {
      case PostType.PERDIDA: return 'danger';
      case PostType.ENCONTRADA: return 'success';
      case PostType.ADOPCION: return 'warning';
      default: return 'secondary';
    }
  }

    getIconoPorTipo(tipo: PostType): string {
    switch(tipo) {
      case PostType.PERDIDA: return '🔍';
      case PostType.ENCONTRADA: return '🏠';
      case PostType.ADOPCION: return '❤️';
      default: return '🐾';
    }
  }
}
