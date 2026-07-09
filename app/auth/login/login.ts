import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.redirectByRole(response.role!);
        } else {
          this.errorMessage = response.message || 'Error de autenticación';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Error de conexión con el servidor.';
      }
    });
  }

  private redirectByRole(role: string): void {
    if (role === 'Superadmin') {
      this.router.navigate(['/superadmin/dashboard']);
    } else if (role === 'Colaborador') {
      this.router.navigate(['/colaborador/dashboard']);
    }
  }

  irAlFormulario(): void {
    this.router.navigate(['/auth/reserva-visita']);
  }
}