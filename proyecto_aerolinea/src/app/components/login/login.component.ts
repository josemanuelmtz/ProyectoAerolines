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
    this.http.post<any>('http://localhost:4200/login', { username: this.username, password: this.password }).subscribe(
      (response) => {
        console.log(response);
        // Aquí puedes redirigir a la página de inicio o realizar otras acciones después del inicio de sesión exitoso.
        this.router.navigate(['/inicio']);
      },
      (error) => {
        console.error(error);
        // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario.
      }
    );
  }
}
