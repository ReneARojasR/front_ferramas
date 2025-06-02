import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  // <-- Agregué import de Router para navegación
import { ChangeDetectorRef } from '@angular/core';


import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { ProductosComponent } from "../../components/productos/productos.component";


import { AutenticarLoginService } from '../../services/autenticar-login.service';

@Component({
  selector: 'app-principal',
  imports: [NavbarComponent, ProductosComponent, CommonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
  usuarioActual: any = null;  // <-- Inicializo en null para no hacer asignaciones múltiples
  mostrarModalSuscripcion = false;

  // Constructor corregido para inyectar los servicios con 'private' y 'Router' para navegación
  constructor(
    private authService: AutenticarLoginService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }


  ngOnInit() {
    const usuario = this.authService.getUsuarioActual();
    if (usuario) {
      this.usuarioActual = usuario;
      this.mostrarModalSuscripcion = usuario.es_suscriptor === 0;
    }

    // Condición clara para mostrar modal solo si usuario existe y no está suscrito
    this.authService.currentUser$.subscribe(user => {
      console.log('Usuario recibido:', user);  // <-- IMPORTANTE
      this.usuarioActual = user;
      this.mostrarModalSuscripcion = !!(user && user.es_suscriptor === 0);
      console.log('¿Mostrar modal?', this.mostrarModalSuscripcion);  // <-- VERIFICACIÓN
      this.cdr.detectChanges();
    });

    // setTimeout(() => {
    //   const usuario = this.authService.getUsuarioActual();
    //   this.usuarioActual = usuario;
    //   this.mostrarModalSuscripcion = usuario?.es_suscriptor === 0;
    //   this.cdr.detectChanges();
    // }, 100);
  }

  // Mostrar modal solo si usuario existe y no es suscriptor
  cerrarModal() {
    this.mostrarModalSuscripcion = false;
  }

  irASuscripcion() {
    this.mostrarModalSuscripcion = false;
    this.router.navigate(['/suscripcion']);  // <-- Uso router para navegar a página de suscripción
  }
}
