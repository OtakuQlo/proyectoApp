import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.page.html',
  styleUrls: ['./panel-admin.page.scss'],
})
export class PanelAdminPage implements OnInit {

  solicitudAutos: any = [{
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

  reporteAutos: any = [{
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

  constructor(private router: Router, private menu: MenuController,private db: DatabaseService) {
    this.db.buscarPublicacion();
  }

  ngOnInit() {
    this.menu.enable(true);
    this.db.bdState().subscribe(res=>{
      if(res){
        this.db.fetchPublicacion().subscribe(datos=>{
          this.solicitudAutos = datos.filter(x => Number(x.estado) === 0);
          this.reporteAutos = datos.filter(x => Number(x.estado) === 2);
          this.db.presentAlert("","Datos agregados");
        })

      }
    })
  }

  irPaginaProducto1(x:any){
    let navigationExtra: NavigationExtras = {
      state: {
        idpublicacionE: x.idpublicacion,
        modeloE: x.modelo,
        marcaE: x.marca,
        precioE: x.precio,
        colorE: x.color,
        transmisionE: x.transmision,
        descripcionE: x.descripcion,
        estadoE: x.estado,
        kilometrajeE: x.kilometraje,
        cantidaddeusoE: x.cantidaddeuso,
        fotoE: x.foto,
        idusuarioE: x.idusuario,
        verificador: "solicitud"
      }
    }
    this.router.navigate(['/pagina-producto'],navigationExtra);

  }

  irPaginaProducto(x:any){
    let navigationExtra: NavigationExtras = {
      state: {
        idpublicacionE: x.idpublicacion,
        modeloE: x.modelo,
        marcaE: x.marca,
        precioE: x.precio,
        colorE: x.color,
        transmisionE: x.transmision,
        descripcionE: x.descripcion,
        estadoE: x.estado,
        kilometrajeE: x.kilometraje,
        cantidaddeusoE: x.cantidaddeuso,
        fotoE: x.foto,
        idusuarioE: x.idusuario
      }
    }
    this.router.navigate(['/pagina-producto'],navigationExtra);

  }

  pasarPersona(id:any){
    this.db.pasarUsuario(id);
  }
}
