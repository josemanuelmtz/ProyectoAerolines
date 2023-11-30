import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HistorialReservasComponent } from './components/usuario/historial-reservas/historial-reservas.component';
import { HomeComponent } from './components/empresa/home-empresa/home-empresa.component';
import { AgregaEmpresaComponent } from './components/empresa/agrega-empresa/agrega-empresa.component';
import { AgregaVuelosComponent } from './components/empresa/agrega-vuelos/agrega-vuelos.component';
import { ReservasComponent } from './components/usuario/reservas/reservas.component';
import { HomeUsuarioComponent} from './components/usuario/home-usuario/home-usuario.component';
import {GestionComponent } from './components/usuario/gestion/gestion.component';
import { GestionReservaComponent } from './components/usuario/gestion-reserva/gestion-reserva.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'historial', component: HistorialReservasComponent},
  {path:'home-e', component: HomeComponent},
  {path: 'gestion-reserva', component: GestionReservaComponent},
  {path:'agregar-vuelos', component: AgregaVuelosComponent},
  {path:'agregar-empresas', component: AgregaEmpresaComponent},
  {path:'reservas', component: ReservasComponent},
  {path:'home-u', component: HomeUsuarioComponent},
  {path:'empresas', component: AgregaEmpresaComponent},
  {path:':id', component: AgregaVuelosComponent},
  {path: 'vuelos', component: AgregaVuelosComponent},
  {path: 'gestion', component: GestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
