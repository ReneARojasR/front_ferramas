import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../interfaces/cart-item.interface';
import { AutenticarLoginService } from './autenticar-login.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<CartItem[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  private carrito: CartItem[] = [];

  constructor(private authService: AutenticarLoginService) {
    const user = this.authService.getUsuarioActual();
    if (user?.id) {
      const guardado = localStorage.getItem(`carrito_${user.id}`);
      if (guardado) {
        this.carrito = JSON.parse(guardado);
        this.carritoSubject.next(this.carrito);
      }
    }
  }

  private guardarEnLocalStorage() {
    const user = this.authService.getUsuarioActual();
    if (user?.id) {
      localStorage.setItem(`carrito_${user.id}`, JSON.stringify(this.carrito));
    }
  }

  agregarAlCarrito(item: CartItem) {
    const index = this.carrito.findIndex(ci => ci.product.id === item.product.id);
    if (index > -1) {
      this.carrito[index].quantity += item.quantity;
    } else {
      this.carrito.push(item);
    }
    this.carritoSubject.next(this.carrito);
    this.guardarEnLocalStorage();
  }

  eliminarDelCarrito(id: number) {
    this.carrito = this.carrito.filter(item => item.product.id !== id);
    this.carritoSubject.next(this.carrito);
    this.guardarEnLocalStorage();
  }

  limpiarCarrito() {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);

    const user = this.authService.getUsuarioActual();
    if (user?.id) {
      localStorage.removeItem(`carrito_${user.id}`);
    }
  }

  getCarritoActual(): CartItem[] {
    return this.carrito;
  }

  setCarrito(items: CartItem[]) {
    this.carrito = [...items];
    this.carritoSubject.next(this.carrito);
    this.guardarEnLocalStorage();
  }
}
