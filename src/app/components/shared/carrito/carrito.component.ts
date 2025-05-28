import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartItem } from '../../../models/cart-item.model';
import { CarritoService } from '../../../services/carrito.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carrito: CartItem[] = [];

  constructor(private carritoService: CarritoService, private router: Router) {}

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
    this.router.navigate(['/pago-iniciar'], );
  }
}
