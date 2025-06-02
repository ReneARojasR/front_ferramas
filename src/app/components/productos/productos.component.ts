import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../models/product.model';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

import { ConexionApiService } from './../../services/conexion-api.service';
import { CarritoService } from '../../services/carrito.service';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MonedaService } from '../../services/moneda.service';
import { AutenticarLoginService } from '../../services/autenticar-login.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButton, MatFormField, MatSelectModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  products: Product[] = [];
  selectedTipo: number | null = null;
  tipos: { id: number; nombre: string }[] = [];
  moneda: 'CLP' | 'USD' = 'CLP';
  valorDolar: number = 1;
  descuentoUsuario: number = 0;  // porcentaje, ej 15 para 15%
  cantidades: { [productId: number]: number } = {};

  constructor(
    private consumoapi: ConexionApiService,
    private carritoService: CarritoService,
    private monedaService: MonedaService,
    private authService: AutenticarLoginService
  ) { }

  ngOnInit() {
    this.getAllProducts();
    this.getTiposProducto();

    // Escuchar cambios en el usuario y actualizar descuento dinámicamente
    this.authService.currentUser$.subscribe(user => {
      if (user && user.id) {
        this.consumoapi.getDescuentoUsuario(user.id).subscribe({
          next: (data: any) => {
            this.descuentoUsuario = data.porcentaje ?? 0;
          },
          error: (err) => {
            console.warn('No se pudo cargar descuento para el usuario:', err);
            this.descuentoUsuario = 0;
          }
        });
      } else {
        // No hay usuario o está deslogueado
        this.descuentoUsuario = 0;
      }
    });

    this.monedaService.moneda$.subscribe(moneda => this.moneda = moneda);
    this.monedaService.valorDolar$.subscribe(valor => this.valorDolar = valor);
  }

  // Resto de métodos como antes...

  getTiposProducto() {
    this.consumoapi.getTiposProducto().subscribe({
      next: (data) => this.tipos = data,
      error: (err) => console.error('Error cargando tipos de producto:', err)
    });
  }

  getAllProducts() {
    this.consumoapi.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  agregarAlCarrito(product: Product) {
    const cantidad = this.cantidades[product.id] || 1;
    this.carritoService.agregarAlCarrito({
      product: product,
      quantity: cantidad,
    });
    this.cantidades[product.id] = 1;
  }

  get filteredProducts() {
    if (!this.products) return [];
    if (this.selectedTipo === null) {
      return this.products;
    }
    return this.products.filter(p => p.tipo === this.selectedTipo);
  }

  precioConDescuento(precio: number): number {
    const descuento = (this.descuentoUsuario || 0) / 100;
    const precioFinal = precio * (1 - descuento);
    return this.moneda === 'USD' ? precioFinal / this.valorDolar : precioFinal;
  }
}
