import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { DatabaseService } from './services/database.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  nombre: string = '';
  apellido: any ;
  rol: any;
  id:any;

  datosnuevos: any = [{
    rol: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: ''
  }];

  constructor( private router: Router,private db: DatabaseService) {}

  ngOnInit(){

    this.db.bdState().subscribe(res=>{
      //verifico si el estatus es true
      if(res){
        //me subscribir al observable de la Tabla
        this.db.fetchUser().subscribe(datos=>{
          this.datosnuevos = datos;
          this.nombre = this.datosnuevos.nombre;
          this.rol = this.datosnuevos.rol;
          this.apellido = this.datosnuevos.apellido;
          localStorage.setItem("idper",this.datosnuevos.idper);
        })
      }
    })
  }

  irInicioSesion(){
    this.router.navigate(['/home']);
    localStorage.removeItem("rol");
    localStorage.removeItem("idper");
   
  }
}
