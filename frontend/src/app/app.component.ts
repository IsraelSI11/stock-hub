import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButton],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Comprobar sesión al iniciar la aplicación
    this.authService.checkSession();

    // Suscribirse al estado de autenticación
    this.authService.isAuthenticated().subscribe(
      (authStatus) => {
        this.isAuthenticated = authStatus;
      }
    );
  }

  onLogout(): void {
    this.authService.logout().subscribe(() => {
      console.log('Usuario desautenticado');
    });
  }
}
