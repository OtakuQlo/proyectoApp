import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string =  '';
  apellido: string = "";
  imagen: string = "https://ionicframework.com/docs/img/demos/avatar.svg";
  rut: string = "";
  correo: string = "";
  direccion: string = "";
  rol: string = "";

  constructor(private router: Router,private activedRouter: ActivatedRoute,private menu: MenuController,) { 
    this.activedRouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.nombre = this.router.getCurrentNavigation()?.extras.state?.['nombre'];
        this.apellido = this.router.getCurrentNavigation()?.extras.state?.['apellido'];
        this.rut = this.router.getCurrentNavigation()?.extras.state?.['rut'];
        this.direccion = this.router.getCurrentNavigation()?.extras.state?.['direccion'];
        this.correo = this.router.getCurrentNavigation()?.extras.state?.['correo'];
        this.rol = this.router.getCurrentNavigation()?.extras.state?.['rol'];
      }
    })
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
