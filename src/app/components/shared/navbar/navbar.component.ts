import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
   imports: [CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
    ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarioNombre: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('user');
    if (usuario) {
      const parsedUser = JSON.parse(usuario);
      this.usuarioNombre = parsedUser.nombre;
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
  localStorage.removeItem('user');
  this.usuarioNombre = null;

}
}
