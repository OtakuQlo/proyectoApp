import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

  iduser = localStorage.getItem("idper");

  constructor(private db: DatabaseService,  private alertController: AlertController) {
    this.db.publicacionUser(this.iduser);
   }
  
  ngOnInit() {
    this.db.bdState().subscribe(res=>{
      if(res){
        this.db.fetchPubliUser().subscribe(datos =>{
          this.arregloAutos = datos;
        })
      }
    })
  }


  irModificarAuto(id:any){
    this.db.pasarmodificarPublicacion(id);
  }

  async eliminarAuto(idpublicacion: string) {
    const header = 'Confirmación';
    const message = '¿Estás seguro de que deseas eliminar esta publicación?';
  
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.db.eliminarProducto(idpublicacion);
            await this.db.publicacionUser(this.iduser);
            await this.db.buscarPublicacion();
            this.db.presentToast('bottom', 'Publicación eliminada con éxito');
          },
        },
      ],
    });
  
    await alert.present();
  }
}
