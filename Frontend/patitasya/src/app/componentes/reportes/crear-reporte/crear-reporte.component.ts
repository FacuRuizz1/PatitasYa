import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostType } from '../../../models/enums';
import { PostTypeLabels } from '../../../models/Reporte';
import { ReporteService } from '../../../services/reporte.service';

@Component({
  selector: 'app-crear-reporte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './crear-reporte.component.html',
  styleUrl: './crear-reporte.component.css'
})
export class CrearReporteComponent {

  reporteForm: FormGroup;
  tipos = PostType;
   tiposLabels = PostTypeLabels;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  imagenesSeleccionadas: File[] = [];
  previewUrls: string[] = [];

   constructor(
    private fb: FormBuilder,
    private reporteService: ReporteService,
    public router: Router
  ) {
    this.reporteForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      tipo: [PostType.PERDIDA, Validators.required],
      ubicacion: ['', [Validators.required, Validators.minLength(5)]],
      latitud: [''],
      longitud: ['']
    });
  }

  // Getters para fácil acceso
  get titulo() { return this.reporteForm.get('titulo'); }
  get descripcion() { return this.reporteForm.get('descripcion'); }
  get tipo() { return this.reporteForm.get('tipo'); }
  get ubicacion() { return this.reporteForm.get('ubicacion'); }


   onTipoChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.reporteForm.patchValue({ tipo: select.value });
  }

   onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      this.imagenesSeleccionadas.push(...files);
      
      // Crear previews
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewUrls.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  eliminarImagen(index: number): void {
    this.imagenesSeleccionadas.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }

  onSubmit(): void {
    if (this.reporteForm.invalid) {
      // Marcar todos los campos como tocados
      Object.keys(this.reporteForm.controls).forEach(key => {
        const control = this.reporteForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Preparar datos
    const formData = {
      titulo: this.reporteForm.value.titulo,
      descripcion: this.reporteForm.value.descripcion,
      tipo: this.reporteForm.value.tipo,
      ubicacion: this.reporteForm.value.ubicacion,
      latitud: this.reporteForm.value.latitud ? parseFloat(this.reporteForm.value.latitud) : undefined,
      longitud: this.reporteForm.value.longitud ? parseFloat(this.reporteForm.value.longitud) : undefined
    };

     this.reporteService.createReport(formData).subscribe({
      next: (response) => {
        this.successMessage = '¡Reporte creado exitosamente!';
        
        // Si hay imágenes, subirlas
        if (this.imagenesSeleccionadas.length > 0) {
          this.subirImagenes(response.id);
        } else {
          setTimeout(() => {
            this.router.navigate(['/reportes']);
          }, 2000);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al crear reporte:', error);
        
        if (error.status === 403) {
          this.errorMessage = 'No tenés permisos para crear reportes. Iniciá sesión nuevamente.';
        } else if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Error al crear el reporte. Intentalo nuevamente.';
        }
      }
    });
  }

    subirImagenes(reportId: number): void {
    let uploads = 0;
    const total = this.imagenesSeleccionadas.length;

    this.imagenesSeleccionadas.forEach(file => {
      this.reporteService.uploadImage(reportId, file).subscribe({
        next: () => {
          uploads++;
          if (uploads === total) {
            setTimeout(() => {
              this.router.navigate(['/reportes']);
            }, 2000);
          }
        },
        error: (error) => {
          console.error('Error al subir imagen:', error);
          uploads++;
          if (uploads === total) {
            setTimeout(() => {
              this.router.navigate(['/reportes']);
            }, 2000);
          }
        }
      });
    });
  }

   getMensajeAyuda(): string {
    switch(this.reporteForm.value.tipo) {
      case PostType.PERDIDA:
        return 'Completá la mayor cantidad de detalles posibles para ayudar a encontrar a la mascota.';
      case PostType.ENCONTRADA:
        return 'Describí dónde y cuándo encontraste a la mascota para ayudar a reunirla con su dueño.';
      case PostType.ADOPCION:
        return 'Contá las características de la mascota para encontrarle un hogar responsable.';
      default:
        return 'Completá el formulario con la mayor cantidad de detalles posibles.';
    }
  }


}
