import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../interfaces/cart-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<CartItem[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  private carrito: CartItem[] = [];

  agregarAlCarrito(item: CartItem) {
    const index = this.carrito.findIndex(ci => ci.product.id === item.product.id);
    if (index > -1) {
      this.carrito[index].quantity += item.quantity;
    } else {
      this.carrito.push(item);
    }
    this.carritoSubject.next(this.carrito);
  }

  eliminarDelCarrito(id: number) {
    this.carrito = this.carrito.filter(item => item.product.id !== id);
    this.carritoSubject.next(this.carrito);
  }

  limpiarCarrito() {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
  }

  getCarritoActual(): CartItem[] {
    return this.carrito;
  }
}
