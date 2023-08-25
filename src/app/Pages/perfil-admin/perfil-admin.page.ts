import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.page.html',
  styleUrls: ['./perfil-admin.page.scss'],
})
export class PerfilAdminPage implements OnInit {
  nombre: string =  '';
  apellido: string = "";
  imagen: string = "https://ionicframework.com/docs/img/demos/avatar.svg";
  rut: string = "";
  correo: string = "";
  direccion: string = "";
  rol: string = "usuario";

  constructor(private router: Router,private activedRouter: ActivatedRoute) { 
    this.activedRouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.nombre = this.router.getCurrentNavigation()?.extras.state?.['nombre'];
        this.apellido = this.router.getCurrentNavigation()?.extras.state?.['apellido'];
        this.rut = this.router.getCurrentNavigation()?.extras.state?.['rut'];
        this.direccion = this.router.getCurrentNavigation()?.extras.state?.['direccion'];
        this.correo = this.router.getCurrentNavigation()?.extras.state?.['correo'];
      }
    })
  }

  ngOnInit() {
  }

  irPanelAdmin(){
    let navigationExtra: NavigationExtras = {
      state: {
      rol: this.rol
      }
    }
    this.router.navigate(['/panel-admin'],navigationExtra);
  }

}
