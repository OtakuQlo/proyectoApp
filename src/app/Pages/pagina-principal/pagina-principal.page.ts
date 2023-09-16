import { Component, OnInit} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.page.html',
  styleUrls: ['./pagina-principal.page.scss'],
})
export class PaginaPrincipalPage implements OnInit {
  
  //Arreglo de autos
  arregloAutos: any = [{
    Id_publicacion: '',
    modelo: '',
    marca: '',
    precio: '',
    color: '',
    transmision: '',
    descripcion: '',
    estado: '',
    kilometraje: '',
    cantidad_de_uso: '',
    foto: '',
    Id_usuario: ''
  }];

  constructor(private router: Router, private menu: MenuController,private db: DatabaseService) {
  }
  
  ngAfterViewInit(){
    this.menu.enable(true);
  }

  ngOnInit() {
    this.menu.enable(true);
    //me subscribo al observable de la BD
    this.db.bdState().subscribe(res=>{
      //verifico si el estatus es true
      if(res){
        //me subscribir al observable de la Tabla
        this.db.fetchPublicacion().subscribe(datos=>{
          this.arregloAutos = datos;
          this.db.presentAlert("Datos agregados");
        })

      }
    })
  }

  play(x:any) {
    let navigationExtras : NavigationExtras={
      state: {
        modeloE: x.modelo,
        marcaE: x.marca,
        precioE: x.precio,
        colorE: x.color,
        transmisionE: x.transmision,
        descripcionE: x.descripcion,
        kilometrajeE: x.kilometraje,
        cantidad_de_usoE: x.cantidad_de_uso,
        fotoE: x.foto,
        nombreV: x.Id_usuario.nombre + x.Id_usuario.apellido,
        direccion: x.Id_usuario.Id_direccion.nombre,
        numeroT: x.Id_usuario.telefono
      }
    }
    this.router.navigate(['/pagina-producto'], navigationExtras);
  }

}