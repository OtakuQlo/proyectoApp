import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: any =  localStorage.getItem("nombre");
  apellido: any = localStorage.getItem("apellido");
  imagen: string = "https://ionicframework.com/docs/img/demos/avatar.svg";
  rut: string = "";
  correo: any = localStorage.getItem("correo");
  direccion: string = "";
  rol: any = localStorage.getItem("rol");

  constructor(private router: Router,private activedRouter: ActivatedRoute,private menu: MenuController,) { 
    
    this.menu.enable(true);
    
  }
  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.menu.enable(true);
  }

  
  irPanelAdmin(){
    let navigationExtra: NavigationExtras = {
      state: {
      rol: this.rol
  
      }
    }
    this.router.navigate(['/panel-admin'],navigationExtra);
  }
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
