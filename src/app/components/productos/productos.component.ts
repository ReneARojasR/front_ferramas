import { ConexionApiService } from './../../services/conexion-api.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../models/product.model';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

import { CarritoService } from '../../services/carrito.service';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButton, MatFormField, MatSelectModule ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
 products: Product[] = [];
 selectedTipo: number | null = null;

 tipoLabels: { [key: number]: string } = {
    1: 'tipo1',
    2: 'tipo2',

  };
 constructor(private consumoapi : ConexionApiService,  private carritoService: CarritoService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getProductById(id: number) {
    this.consumoapi.getProductById(id).subscribe((data) => {
      console.log(data);
    });
  }

  getAllProducts() {
    this.consumoapi.gerAllPRoducts().subscribe((data) => {
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
    this.carritoService.agregarAlCarrito(product);
  }

  get filteredProducts() {
    if (!this.products) return [];

    if (this.selectedTipo === null) {
      return this.products;
    }

    return this.products.filter(p => p.tipo === this.selectedTipo);
  }
}
