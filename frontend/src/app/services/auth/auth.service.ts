import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';  // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post(`${this.apiUrl}/user/login`, credentials, options).pipe(
      tap(() => console.log('Usuario autenticado'))
    );
  }

  register(userName: string, email:string, password:string): Observable<any> {
    const credentials = { userName, email, password };
    
    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post(`${this.apiUrl}/user/register`, credentials, options).pipe(
      tap(() => console.log('Usuario registrado'))
    );
  }

  logout(): Observable<any> {
    const options = { withCredentials: true };
    return this.http.post(`${this.apiUrl}/user/logout`, {}, options).pipe(
      tap(() => console.log('Usuario desautenticado'))
    );
  }

  isAuthenticated(): Observable<boolean> {
    // Llamando a la API para verificar si la sesión está activa
    return this.http.get<boolean>(`${this.apiUrl}/check-session`, { withCredentials: true });
  }
}
