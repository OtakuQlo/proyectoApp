import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

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
  correo: any;
  direccion: string = "";
  rol = localStorage.getItem("rol") ;
  idper = localStorage.getItem("idper");

  datosnuevos: any = [{
      idper: '',
      rol: '',
      nombre: '',
      apellido: '',
      correo: '',
      telefono: ''
  }];

  constructor(private router: Router,private activedRouter: ActivatedRoute,private menu: MenuController, private db:DatabaseService) { 
    
    this.menu.enable(true);
    
  }
  ngOnInit() {
    this.db.bdState().subscribe(res=>{
      //verifico si el estatus es true
      if(res){
        //me subscribir al observable de la Tabla
        this.db.fetchUser().subscribe(datos=>{
          this.datosnuevos = datos;
          localStorage.setItem("ïdper",this.datosnuevos.idper);
          localStorage.setItem("rol",this.datosnuevos.rol);
          this.db.presentAlert("","Datos agregados");
        })

      }
    })
  }

  ngAfterViewInit(){
    this.menu.enable(true);
  }

  
  irPanelAdmin(){
    this.router.navigate(['/panel-admin']);
  }
  irModificarPerfil(){
    this.db.pasarPerfil(localStorage.getItem("idper"));
    
  }
  irIngresarContra(){
    this.router.navigate(['/ingresarcontra']);
  }
  irAnadirAuto(){
    this.router.navigate(['/anadir-producto'])
  }
  irCrearAdmin(){
    this.router.navigate(['/crear-admin'])
  }
}
