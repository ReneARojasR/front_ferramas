import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CarritoService } from '../../services/carrito.service';
import { CartItem } from '../../interfaces/cart-item.interface';

declare var MercadoPago: any;

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  private http = inject(HttpClient);
  private carritoService = inject(CarritoService);
  carrito: CartItem[] = [];

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
      this.iniciarPago();
    });
  }

  iniciarPago() {
    const productos = this.carrito.map(item => ({
      nombre: item.product.nombre,
      cantidad: item.quantity,
      precio: item.product.precio
    }));

    this.http.post<any>('http://localhost:5000/api/crear-preferencia', {
      items: productos
    }).subscribe(res => {
      const mp = new MercadoPago('TU_PUBLIC_KEY', { locale: 'es-CL' });
      mp.checkout({
        preference: { id: res.id },
        render: {
          container: '#wallet_container',
          label: 'Pagar ahora'
        }
      });
    });
  }
}
