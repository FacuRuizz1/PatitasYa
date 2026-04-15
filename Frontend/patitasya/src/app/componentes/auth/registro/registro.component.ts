import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';

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
    private router: Router,
     private alertService: AlertService
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
      this.alertService.warning('Completá todos los campos correctamente', 'Campos inválidos');
      return;
    }

    this.loading = true;

    this.authService.register(this.registroForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        this.alertService.success(
          'Tu cuenta ha sido creada exitosamente. Ya podés iniciar sesión.',
          '¡Registro completado!'
        );
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al registrar:', error);
        
        if (error.error && error.error.message) {
          this.alertService.error(error.error.message, 'Error de registro');
        } else {
          this.alertService.error('Hubo un problema al crear tu cuenta. Intentá nuevamente.', 'Error');
        }
      }
    });
  }

  get nombre() { return this.registroForm.get('nombre'); }
  get email() { return this.registroForm.get('email'); }
  get password() { return this.registroForm.get('password'); }


}
