import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Simulación de una petición al backend
  login(email: string, password: string): Observable<{ success: boolean; role?: string; message?: string }> {
    // Lógica Mock: Cambia esto por tu HttpClient real después
    if (email === 'admin@botanico.com' && password === 'admin123') {
      return of({ success: true, role: 'Superadmin' }).pipe(delay(1000));
    } else if (email === 'colaborador@botanico.com' && password === 'colab123') {
      return of({ success: true, role: 'Colaborador' }).pipe(delay(1000));
    } else {
      return of({ success: false, message: 'Credenciales inválidas' }).pipe(delay(1000));
    }
  }
}