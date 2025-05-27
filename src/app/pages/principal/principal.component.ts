import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { ProductosComponent } from "../../components/productos/productos.component";

@Component({
  selector: 'app-principal',
  imports: [NavbarComponent, ProductosComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

}
