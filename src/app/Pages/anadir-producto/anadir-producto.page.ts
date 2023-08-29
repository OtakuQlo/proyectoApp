import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-anadir-producto',
  templateUrl: './anadir-producto.page.html',
  styleUrls: ['./anadir-producto.page.scss'],
})

export class AnadirProductoPage implements OnInit {

  constructor(private router:Router,private toastController: ToastController,private AlertController:AlertController) { }

  modeloV: string = "";
  precioV: number = 0;
  colorV: string ="";
  marcaV: string ="";
  anosV: number= 0;
  descrpV: string = "";
  kilometrajeV: number = 0; 
  transmisionV: string ="";

  regexname: RegExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,100}$/;

  labelModelo: string = '';
  labelPrecio: string = '';
  labelAnos: string = '';
  labelDescrp: string = '';
  labelKilometraje: string = '';
  labelSelects: string = '';

  pass: number = 0;

  arrTrans : string[] = ["Automatica", "Semiautomatica", "Manual"];

  ngOnInit() {
  }

  irPaginaPrincipal(){
    if(this.modeloV != ""  && this.descrpV != "" ){
      if(this.regexname.test(this.modeloV)){
        this.pass = 1;
        this.labelModelo = 'El modelo debe contener como minimo 2 caracteres no especiales.';
      }
      if(this.descrpV.length < 10){
        this.pass = 1;
        this.labelDescrp = 'La descripcion debe contener como minimo 10 caracteres.';
      }
    }else{
      this.pass = 0;
    }

    if (this.transmisionV != "" && this.colorV != "" && this.marcaV != "") {
      this.pass = 0;
    }else{
      this.labelSelects = 'Porfavor seleccione una opción.'
    }

    if( this.precioV != 0 && this.precioV > 0 && this.anosV != 0 && this.anosV > 0 && this.kilometrajeV != 0 && this.kilometrajeV > 0){
      this.pass = 0;

      if (this.kilometrajeV > 320000 ) {
        this.pass = 1;
        this.labelKilometraje = 'El auto no puede ser publicado si su kilometraje pasa los 320,000.';
      }
    }

    if(this.pass == 0){
      this.router.navigate(['/pagina-principal']);
      this.presentToast('bottom');
    }
  };

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Tu auto ha sido publicado',
      duration: 1500,
      position: position,
    });
  }

}