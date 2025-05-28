import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: CartItem[] = [];
  private carritoSubject = new BehaviorSubject<CartItem[]>([]);

  carrito$ = this.carritoSubject.asObservable();

  agregarAlCarrito(product: Product): void {
    const index = this.carrito.findIndex(item => item.product.id === product.id);
    if (index !== -1) {
      this.carrito[index].quantity++;
    } else {
      this.carrito.push({ product, quantity: 1 });
    }
    this.carritoSubject.next(this.carrito);
  }

  eliminarDelCarrito(productId: number): void {
    this.carrito = this.carrito.filter(item => item.product.id !== productId);
    this.carritoSubject.next(this.carrito);
  }

  limpiarCarrito(): void {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
  }

  obtenerCarrito(): CartItem[] {
    return [...this.carrito];
  }
}
