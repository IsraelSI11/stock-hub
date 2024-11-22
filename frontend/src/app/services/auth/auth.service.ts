import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { apiUrl } from '../../shared/constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Estado inicial

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${apiUrl}/user/login`, credentials, options).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true); // Cambiar el estado a autenticado
        console.log('Usuario autenticado');
      })
    );
  }

  register(userName: string, email: string, password: string): Observable<any> {
    const credentials = { userName, email, password };

    // Configuración para enviar cookies con la solicitud
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(`${ apiUrl }/user/register`, credentials, options).pipe(
      tap(() => console.log('Usuario registrado'))
    );
  }

  logout(): Observable<any> {
    const options = { withCredentials: true };
    return this.http.post(`${apiUrl}/user/logout`, {}, options).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false); // Cambiar el estado a no autenticado
        console.log('Usuario desautenticado');
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable(); // Observable del estado
  }

  checkSession(): void {
    this.http.get<boolean>(`${apiUrl}/check-session`, { withCredentials: true }).subscribe(
      (isAuth) => this.isAuthenticatedSubject.next(isAuth), // Actualizar el estado
      () => this.isAuthenticatedSubject.next(false) // Si hay error, no autenticado
    );
  }
}
