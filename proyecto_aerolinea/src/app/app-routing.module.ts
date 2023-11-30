import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { GestionReservaComponent } from './components/gestion-reserva/gestion-reserva.component';

const routes: Routes = [
  //{path:'login', component: LoginComponent},
  {path:'reservas', component: ReservasComponent},
  {path:'gestion-reserva', component: GestionReservaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
