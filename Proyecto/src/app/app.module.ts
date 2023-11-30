import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HistorialReservasComponent } from './components/usuario/historial-reservas/historial-reservas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregaEmpresaComponent } from './components/empresa/agrega-empresa/agrega-empresa.component';
import { AgregaVuelosComponent } from './components/empresa/agrega-vuelos/agrega-vuelos.component';
import { ReservasComponent } from './components/usuario/reservas/reservas.component';
import { HomeUsuarioComponent} from './components/usuario/home-usuario/home-usuario.component';
import { RouterModule } from '@angular/router';
import { GestionComponent } from './components/usuario/gestion/gestion.component';
import { GestionReservaComponent } from './components/usuario/gestion-reserva/gestion-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HistorialReservasComponent,
    AgregaEmpresaComponent,
    AgregaVuelosComponent,
    ReservasComponent,
    HomeUsuarioComponent,
    GestionComponent,
    GestionReservaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
