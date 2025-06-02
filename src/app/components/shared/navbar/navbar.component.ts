import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';


import { CarritoService } from '../../../services/carrito.service';
import { CarritoComponent } from '../carrito/carrito.component';
import { AutenticarLoginService } from '../../../services/autenticar-login.service';
import { MonedaService } from '../../../services/moneda.service';
import { DivisaService } from '../../../services/divisa.service';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    FormsModule,

    CarritoComponent,

  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  mostrarCarrito = false;
  totalItems = 0;
  usuarioNombre: string | null = null;

  monedaSeleccionada: 'CLP' | 'USD' = 'CLP';
  valorDolar: number = 0;

  constructor(private router: Router, private carritoService: CarritoService, private authService: AutenticarLoginService, private monedaService: MonedaService,
    private divisaService: DivisaService) { }

  ngOnInit(): void {
    const usuario = localStorage.getItem('user');
    if (usuario) {
      const parsedUser = JSON.parse(usuario);
      this.usuarioNombre = parsedUser.nombre;
    }

    this.carritoService.carrito$.subscribe(items => {
      this.totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    });

    // obtener valor dolar al inicio
    this.divisaService.obtenerTipoCambioUSD().subscribe(valor => {
      this.monedaService.setValorDolar(valor || 1);
    });

    this.monedaService.moneda$.subscribe(moneda => {
      this.monedaSeleccionada = moneda;
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
    localStorage.removeItem('discount');



    this.authService.logout(); // limpia usuario y descuento
    this.usuarioNombre = null;


  }

  cambiarMoneda(nuevaMoneda: 'CLP' | 'USD') {
    this.monedaService.setMoneda(nuevaMoneda);
  }
}
