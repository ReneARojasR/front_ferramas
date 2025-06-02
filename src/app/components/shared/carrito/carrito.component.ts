import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartItem } from '../../../interfaces/cart-item.interface';
import { CarritoService } from '../../../services/carrito.service';
import { AutenticarLoginService } from '../../../services/autenticar-login.service';
import { MonedaService } from '../../../services/moneda.service';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent {
  carrito: CartItem[] = [];
  descuentoUsuario: number = 0;
  moneda: 'CLP' | 'USD' = 'CLP';
  valorDolar: number = 1;

  constructor(
    private carritoService: CarritoService,
    private authService: AutenticarLoginService,
    private router: Router,
    private http: HttpClient,
    private monedaService: MonedaService
  ) { }

  ngOnInit() {
    this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
    });

    this.authService.discount$.subscribe(descuento => {
      this.descuentoUsuario = descuento;
    });

    this.monedaService.moneda$.subscribe(moneda => this.moneda = moneda);
    this.monedaService.valorDolar$.subscribe(valor => this.valorDolar = valor);
  }

  eliminarItem(id: number) {
    this.carritoService.eliminarDelCarrito(id);
  }

  irAlPago() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) {
      this.descuentoUsuario = 0;
      alert('Debes iniciar sesión para realizar la compra');
      this.router.navigate(['/login']);
      return;
    }

    const totalSinDescuento = this.carrito.reduce((sum, item) => sum + (item.product.precio * item.quantity), 0);

    const orden = {
      userId: user.id,
      items: this.carrito.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      total: totalSinDescuento
    };

    this.http.post<{ url_pago: string }>('http://localhost:5000/crear_orden', orden).subscribe({
      next: response => {
        if (response.url_pago) {
          this.carritoService.limpiarCarrito(); // ✅ limpiar solo si se inicia el pago
          window.location.href = response.url_pago;
        } else {
          alert('Orden creada, pero no se pudo iniciar el pago');
        }
      },
      error: err => {
        console.error('Error al crear la orden:', err);
        alert('Ocurrió un error al procesar tu compra.');
      }
    });
  }

  precioConDescuento(precio: number): number {
    const descuento = (this.descuentoUsuario || 0) / 100;
    const precioFinal = precio * (1 - descuento);
    return this.moneda === 'USD' ? precioFinal / this.valorDolar : precioFinal;
  }

  getTotal(): number {
    const totalSinDescuento = this.carrito.reduce((sum, item) =>
      sum + (item.product.precio * item.quantity), 0);

    let totalFinal = totalSinDescuento;

    if (this.descuentoUsuario > 0) {
      totalFinal -= totalFinal * this.descuentoUsuario / 100;
    }

    return this.moneda === 'USD' && this.valorDolar > 0
      ? parseFloat((totalFinal / this.valorDolar).toFixed(2))
      : totalFinal;
  }

  limpiarCarrito() {
  this.carritoService.limpiarCarrito();
}

}
