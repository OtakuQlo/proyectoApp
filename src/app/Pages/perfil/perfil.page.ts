import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {
    }

  
    nombre: string =  "Miguel";
    apellido: string = "Pérez";
    imagen: string = "https://ionicframework.com/docs/img/demos/avatar.svg";
    rut: string = "11.111.111-1";
    correo: string = "correoreal@gmail.com";
    direccion: string = "Los olmos #1111";

  irModificarPerfil(){
    this.router.navigate(['/modificar-perfil']);

  }
  irIngresarContra(){
    this.router.navigate(['/ingresarcontra']);
  }
  irAnadirAuto(){
    this.router.navigate(['/anadir-producto'])
  }
}
