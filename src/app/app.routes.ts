import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { PagoRespuestaComponent } from './pages/pago-respuesta/pago-respuesta.component';
import { PagoIniciarComponent } from './pages/pago-iniciar/pago-iniciar.component';
import { SuscripcionComponent } from './pages/suscripcion/suscripcion.component';

export const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'pago/iniciar', component: PagoIniciarComponent },
  { path: 'pago/respuesta', component: PagoRespuestaComponent },
  { path: 'suscripcion', component: SuscripcionComponent },
  { path: '**', redirectTo: 'principal' },
];
