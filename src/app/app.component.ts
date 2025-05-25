import { Component } from '@angular/core';

import { ProductosComponent } from './components/productos/productos.component';
import { RouterLink,  RouterOutlet } from '@angular/router';


import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductosComponent, MatButtonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front_ferramas';



}
