import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartItem } from '../../../interfaces/cart-item.interface';
import { CarritoService } from '../../../services/carrito.service';

import { Router } from '@angular/router';


import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carrito: CartItem[] = [];


  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private http: HttpClient // Inyecta HttpClient
  ) { }

  ngOnInit() {
    this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
    });
  }

  eliminarItem(id: number) {
    this.carritoService.eliminarDelCarrito(id);
  }

  limpiarCarrito() {
    this.carritoService.limpiarCarrito();
  }

  getTotal(): number {
    return this.carrito.reduce((sum, item) => sum + (item.product.precio * item.quantity), 0);
  }

  irAlPago() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.id) {
      alert('Debes iniciar sesión para realizar la compra');
      this.router.navigate(['/login']);
      return;
    }

    const total = this.getTotal();
    if (total <= 0) {
      alert('El total debe ser mayor a $0');
      return;
    }

    const orden = {
      userId: user.id,
      items: this.carrito.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      total
    };

    this.http.post<{ url_pago: string, token: string }>('http://localhost:5000/crear_orden', orden).subscribe({
      next: (response) => {
        if (response.url_pago) {
          // Redirigir a la url de pago de Webpay
          window.location.href = response.url_pago;
        } else {
          alert('Orden creada, pero no se pudo iniciar el pago');
        }
      },
      error: err => {
        console.error('Error al crear la orden:', err);
        alert('Ocurrió un error al procesar tu compra. Inténtalo nuevamente.');
      }
    });
  }


}
