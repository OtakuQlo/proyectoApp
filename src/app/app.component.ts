import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  nombre: any = localStorage.getItem("nombre");
  apellido: any = localStorage.getItem("apellido");

  constructor( private router: Router) {}


  irInicioSesion(){
    this.router.navigate(['/home']);
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.removeItem("rol");
    localStorage.removeItem("idper");
    localStorage.removeItem("apellido");
  }
}
