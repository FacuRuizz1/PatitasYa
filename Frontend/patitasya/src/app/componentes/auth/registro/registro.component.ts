import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registroForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
       email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      telefono: ['']
    });
  }

   onSubmit(): void {
    if (this.registroForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.registroForm.controls).forEach(key => {
        const control = this.registroForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.registroForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = '¡Usuario registrado exitosamente! Redirigiendo al login...';
        
        // Limpiar formulario
        this.registroForm.reset();
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al registrar:', error);
        
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else if (error.status === 0) {
          this.errorMessage = 'Error de conexión. ¿El backend está corriendo?';
        } else {
          this.errorMessage = 'Error al registrar usuario. Intentalo nuevamente.';
        }
      }
    });

  }

  // Getters para facilitar el acceso en el template
  get nombre() { return this.registroForm.get('nombre'); }
  get email() { return this.registroForm.get('email'); }
  get password() { return this.registroForm.get('password'); }
  get telefono() { return this.registroForm.get('telefono'); }


}
