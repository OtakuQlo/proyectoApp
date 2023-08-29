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

  regexname: RegExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,100}$/;

  labelModelo: string = '';
  labelPrecio: string = '';
  labelAnos: string = '';
  labelDescrp: string = '';
  labelKilometraje: string = '';
  labelTrans: string = '';
  labelColor: string = '';
  labelMarca: string = '';
  
  pass: number = 0;

  arrTrans : string[] = ["Automatica", "Semiautomatica", "Manual"];
  arrMarca : string[] = ["Chevrolet","Audi","Alfa Romeo", "Subaru"];
  arrColor : string[] = ["Rojo","Azul","Gris", "Blanco", "Negro"];


  ngOnInit() {
  }

  irPaginaPrincipal(){
    if(!this.regexname.test(this.modeloV)){
      this.pass = 1;
      this.labelModelo = 'El modelo debe contener como minimo 2 caracteres no especiales.';
    }else{
      this.labelModelo = '';
    }

    if(this.descrpV == "" || this.descrpV.length < 10){
      this.pass = 1;
      this.labelDescrp = 'La descripcion debe contener como minimo 10 caracteres.';
    }else{
      this.pass = 0;
    }

    if (this.transmisionV == "") {
      this.pass = 1;
      this.labelTrans = 'Porfavor seleccione una opción.'
    }else{
      this.pass = 0;
      this.labelTrans = '';
    }

    if (this.colorV == "") {
      this.pass = 1;
      this.labelColor = 'Porfavor seleccione una opción.'
    }else{
      this.pass = 0;
      this.labelColor = '';
    }

    if (this.marcaV == "") {
      this.pass = 1;
      this.labelMarca = 'Porfavor seleccione una opción.'
    }else{
      this.pass = 0;
      this.labelMarca = '';
    }

    if(this.anosV != 0 && this.anosV > 0){
      this.pass = 0;
    }

    if (this.kilometrajeV == 0) {
      this.pass = 1;
      this.labelKilometraje = 'Ingrese el kilometraje del Auto.';
      if(this.kilometrajeV > 320000){
        this.pass = 1;
        this.labelKilometraje = 'El auto no puede ser publicado si su kilometraje pasa los 320000.';
      }
    }
    else{
      this.pass = 0;
      this.labelKilometraje = '';
    }

    if(this.anosV == 0 ){
      this.pass = 1;
      this.labelAnos = 'Debe ingresar como minimo 1 año.';
    }else{
      this.pass = 0;
      this.labelAnos = '';
    }

    if(this.precioV == 0){
      this.pass = 1;
      this.labelPrecio = 'Ingrese un precio para su Auto en venta.'
    }else{
      this.pass = 0;
      this.labelPrecio = '';
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