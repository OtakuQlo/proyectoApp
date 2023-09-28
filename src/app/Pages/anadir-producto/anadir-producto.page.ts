import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  ToastController } from '@ionic/angular';
import { CamaraService } from 'src/app/services/camara.service';
import { DatabaseService } from 'src/app/services/database.service';



@Component({
  selector: 'app-anadir-producto',
  templateUrl: './anadir-producto.page.html',
  styleUrls: ['./anadir-producto.page.scss'],
})

export class AnadirProductoPage implements OnInit {
  
  modeloV: string = "";
  precioV : string = "";
  colorV: string ="";
  marcaV: string ="";
  anosV : string = "";
  descrpV: string = "";
  kilometrajeV : string = ""; 
  transmisionV: string ="";
  foto: any = './../assets/icon/boton-agregar.png';

  regexname: RegExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,100}$/;

  labelModelo: string = '';
  labelPrecio: string = '';
  labelAnos: string = '';
  labelDescrp: string = '';
  labelKilometraje: string = '';
  labelTrans: string = '';
  labelColor: string = '';
  labelMarca: string = '';
  labelFoto: string= '';

  arrTrans : string[] = ["Automatica", "Semiautomatica", "Manual"];
  arrMarca : string[] = ["Chevrolet","Audi","Alfa Romeo", "Subaru"];
  arrColor : string[] = ["Rojo","Azul","Gris", "Blanco", "Negro"];

  constructor(private router:Router,private db: DatabaseService, private camara: CamaraService) { }


  ngOnInit() {

  }

  async tomarfoto(){
    await this.camara.takePicture();
    this.foto = this.camara.foto;
    this.labelFoto = '';
  }

  irPaginaPrincipal(){
    let pass = 0;
    console.log(pass)

    if(!this.regexname.test(this.modeloV)){
      pass = 1;
      this.labelModelo = 'El modelo debe contener como minimo 2 caracteres no especiales.';
    }else{
      this.labelModelo = '';
    }
    
    if(!this.camara.foto){
      pass = 1;
      this.labelFoto = 'Necesita agregar unicamente una foto a la publicacion'
    }else{
      this.labelFoto = '';
    }

    if(this.descrpV == "" || this.descrpV.length < 10){
      pass = 1;
      this.labelDescrp = 'La descripcion debe contener como minimo 10 caracteres.';
    }else{
      this.labelDescrp = '';
    }

    if (this.transmisionV == "") {
      pass = 1;
      this.labelTrans = 'Porfavor seleccione una opción.'
    }else{
      this.labelTrans = '';
    }

    if (this.colorV == "") {
      pass = 1;
      this.labelColor = 'Porfavor seleccione una opción.'
    }else{
      this.labelColor = '';
    }

    if (this.marcaV == "") {
      pass = 1;
      this.labelMarca = 'Porfavor seleccione una opción.'
    }else{
      this.labelMarca = '';
    }

    if (parseInt(this.kilometrajeV) == 0 || this.kilometrajeV == "" || this.regexname.test(this.kilometrajeV) ) {
      pass = 1;
      this.labelKilometraje = 'Ingrese el kilometraje del Auto.';
      if(parseInt(this.kilometrajeV) > 320000){
        pass = 1;
        this.labelKilometraje = 'El auto no puede ser publicado si su kilometraje pasa los 320000.';
      }
    }
    else{
      this.labelKilometraje = '';
    }

    if(parseInt(this.anosV) == 0 || this.anosV == "" || this.regexname.test(this.anosV)){
      pass = 1;
      this.labelAnos = 'Debe ingresar como minimo 1 año.';
    }else{
      this.labelAnos = '';
    }

    if(parseInt(this.precioV) == 0 || this.precioV == "" || this.regexname.test(this.precioV)){
      pass = 1;
      this.labelPrecio = 'Ingrese un precio para su Auto en venta.';
    }else{
      this.labelPrecio = '';
    }

    if(pass == 0){
      this.agregarPublicacion();
    }
  };
  
  agregarPublicacion(){
    this.db.crearPublicacion(this.modeloV, this.marcaV, this.precioV, this.colorV, this.transmisionV, this.descrpV, 0, this.kilometrajeV, this.anosV, this.foto, 1);
    this.db.presentToast('bottom','Publicacion creada correctamente');
    this.router.navigate(['/pagina-principal'])
  }

}