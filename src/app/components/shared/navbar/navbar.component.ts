import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../../../services/carrito.service';
import { CarritoComponent } from '../carrito/carrito.component';



@Component({
  selector: 'app-navbar',
   imports: [CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CarritoComponent
    ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mostrarCarrito = false;
  totalItems = 0;
  usuarioNombre: string | null = null;

  constructor(private router: Router, private carritoService: CarritoService) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('user');
    if (usuario) {
      const parsedUser = JSON.parse(usuario);
      this.usuarioNombre = parsedUser.nombre;
    }

     this.carritoService.carrito$.subscribe(items => {
    this.totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  });
  }



  toggleCarrito() {
  this.mostrarCarrito = !this.mostrarCarrito;
}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
  localStorage.removeItem('user');
  this.usuarioNombre = null;

}
}
