import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

   loginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.alertService.warning('Completá todos los campos correctamente', 'Campos incompletos');
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        
        // Decodificar el token
        const token = response.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Guardar información del usuario
        const userName = payload.nombre || payload.name || this.loginForm.value.email.split('@')[0];
        this.authService.setUserName(userName);
        
        const userRole = payload.rol || payload.role || 'USER';
        this.authService.setUserName(userRole);
        
        this.alertService.success(`¡Bienvenido ${userName}!`, 'Inicio de sesión exitoso');
        this.router.navigate(['/reportes']);
      },
      error: (error) => {
        console.error('Error de login:', error);
        this.loading = false;
        this.alertService.error('Email o contraseña incorrectos', 'Error de autenticación');
      }
    });
  }
  

}
