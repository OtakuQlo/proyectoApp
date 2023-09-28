import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {

  //Arreglo de autos
  arregloAutos: any = [{
    idpublicacion: '',
    modelo: '',
    marca: '',
    precio: '',
    color: '',
    transmision: '',
    descripcion: '',
    estado: '',
    kilometraje: '',
    cantidaddeuso: '',
    foto: '',
    idusuario: ''
  }];

  iduser = localStorage.getItem("idper")

  constructor(private router:Router, private db: DatabaseService) {
    this.db.publicacionUser(this.iduser);
   }
  
  ngOnInit() {
    this.db.bdState().subscribe(res=>{
      if(res){
        this.db.fetchPubliUser().subscribe(datos =>{
          this.arregloAutos = datos;
          this.db.presentAlert("","Datos encontrados");
        })
      }
    })
  }

  verMiPubli(){
    
  }

  irModificarAuto(){

  }

  eliminarAuto(){

  }
}
