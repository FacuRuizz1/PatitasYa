import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

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

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router){ 

      this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

   onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        
        // Decodificar el token para obtener información
        try {
          const token = response.token;
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log('Payload del token:', payload);
          
          // Guardar el nombre del usuario (intenta diferentes campos posibles)
          const userName = payload.nombre || payload.name || payload.sub?.split('@')[0] || 'Usuario';
          this.authService.setUserName(userName);
          
          // Guardar el rol (intenta diferentes campos posibles)
          const userRole = payload.rol || payload.role || payload.authorities?.[0] || 'USER';
          this.authService.setUserName(userRole);
          
        } catch (error) {
          console.error('Error decodificando token:', error);
          // Si no se puede decodificar, usar email como nombre
          this.authService.setUserName(this.loginForm.value.email.split('@')[0]);
        }
        
        this.router.navigate(['/reportes']);
      },
      error: (error) => {
        console.error('Error de login:', error);
        this.errorMessage = 'Email o contraseña incorrectos';
        this.loading = false;
      }
    });
  

  }

  

}
