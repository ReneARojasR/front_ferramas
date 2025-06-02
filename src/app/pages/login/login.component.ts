import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticarLoginService } from '../../services/autenticar-login.service'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AutenticarLoginService, private router: Router) { }

  onLogin(): void {
    if (!this.email || !this.password) {
      this.message = 'Email y contraseña son obligatorios.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/principal']);
      },
      error: (err) => {
        this.message = 'Credenciales incorrectas.';
      }
    });

  }

  loginSuccess() {
    this.router.navigate(['/productos']);
  }
}
