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

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router){ 

      this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if(this.loginForm.invalid){
      return;
    }

     this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/reportes']);
      },
      error: (error) => {
        this.errorMessage = 'Email o contraseña incorrectos';
      }
    });

  }

  

}
