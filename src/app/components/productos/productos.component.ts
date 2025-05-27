import { ConexionApiService } from './../../services/conexion-api.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../models/product.model';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButton ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
 products: Product[] = [];
 constructor(private consumoapi : ConexionApiService) {}

  ngOnInit() {
    // this.consumoapi.gerAllPRoducts().subscribe((data) => {
    //   console.log(data);
    // });

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
}
