import { ConexionApiService } from './../../services/conexion-api.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../models/product.model';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

import { CarritoService } from '../../services/carrito.service';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

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

  cantidades: { [productId: number]: number } = {};
  constructor(
    private consumoapi: ConexionApiService
    , private carritoService: CarritoService) { }

  ngOnInit() {
    this.getAllProducts();
    this.getTiposProducto();
  }


  getTiposProducto() {
    this.consumoapi.getTiposProducto().subscribe({
      next: (data) => this.tipos = data,
      error: (err) => console.error('Error cargando tipos de producto:', err)
    });
  }

  getProductById(id: number) {
    this.consumoapi.getProductById(id).subscribe((data) => {
      console.log(data);
    });
  }

  getAllProducts() {
    console.log('Cargando productos...');
    this.consumoapi.getAllProducts().subscribe((data) => {

    console.log('Productos cargados:', data);
      this.products = data;
    });
  }

  get tiposUnicos(): number[] {
    const tipos = this.products.map(p => p.tipo);
    return [...new Set(tipos)]; // elimina duplicados
  }

  productsFiltered(): Product[] {
    if (this.selectedTipo == null) return this.products;
    return this.products.filter(p => p.tipo === this.selectedTipo);
  }

 agregarAlCarrito(product: Product) {
    const cantidad = this.cantidades[product.id] || 1;
    this.carritoService.agregarAlCarrito({
      product: product,
      quantity: cantidad,
    });
    this.cantidades[product.id] = 1; // Reset a 1 tras agregar
  }

  get filteredProducts() {
    if (!this.products) return [];

    if (this.selectedTipo === null) {
      return this.products;
    }

    return this.products.filter(p => p.tipo === this.selectedTipo);
  }
}
