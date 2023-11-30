import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const requestData = {
      usuario: this.username,
      contrasena: this.password,
    };
    this.http.get('http://localhost:3001/login', { params: requestData }).subscribe(
      (response: any) => {

        console.log('Respuesta del servidor:', response);
        if (response.message === 'Inicio de sesión exitoso') {

          const rolUsuario = response.usuario.rolUsuario;
          console.log('Rol del usuario:', rolUsuario);
          
          if (rolUsuario === 0) {
            this.router.navigate(['/home-u']); 
          } else if (rolUsuario === 1) {
            this.router.navigate(['/home-e']); 
          } 
        } else {
          console.error('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en la solicitud: ', error);
      }
    );
  }

  registrar() {
    const requestData = {
      usuario: this.username,
      contrasena: this.password,
      rol: 0 // Establece el valor del rol a 0
    };

    this.http.post('http://localhost:3001/registrar', requestData).subscribe(
      (response) => {
        // Maneja la respuesta del servidor aquí (registro)
        console.log(response);
        this.router.navigate(['/home-u']);
      },
      (error) => {
        // Maneja los errores, por ejemplo:
        console.error('Error en la solicitud de registro: ', error);
      }
    );
  }
}
