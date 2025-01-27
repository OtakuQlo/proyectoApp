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
  colorV: string = "";
  marcaV: string = "";
  anosV : string = "";
  descrpV: string = "";
  kilometrajeV : string = ""; 
  transmisionV: string = "";
  foto: any = './../assets/icon/boton-agregar.png';

  regexnumber: RegExp = /^\d+$/

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

  constructor(private router:Router,private db: DatabaseService, private camara: CamaraService) {
    this.modeloV = "";
    this.precioV  = "";
    this.colorV = "";
    this.marcaV = "";
    this.anosV = "";
    this.descrpV = "";
    this.kilometrajeV = ""; 
    this.transmisionV = "";
    this.foto = './../assets/icon/boton-agregar.png';
   }


  ngOnInit() {

  }

  async tomarfoto(){
    await this.camara.takePicture();
    this.foto = this.camara.foto;
    this.labelFoto = '';
  }

  irPaginaPrincipal(){
    let pass = 0;

    if(this.modeloV.length < 1 ){
      pass = 1;
      this.labelModelo = 'El modelo debe contener como minimo 2 caracteres no especiales.';
    }else{
      this.labelModelo = '';
    }
    
    if(!this.camara.foto && this.foto === './../assets/icon/boton-agregar.png'){
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

    if (!this.regexnumber.test(this.kilometrajeV) || this.kilometrajeV == "" || parseInt(this.kilometrajeV) == 0) {
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

    if(parseInt(this.anosV) == 0 || this.anosV == "" || !this.regexnumber.test(this.anosV)){
      pass = 1;
      this.labelAnos = 'Debe ingresar como minimo 1 año.';
    }else{
      this.labelAnos = '';
    }

    if(parseInt(this.precioV) == 0 || this.precioV == "" || !this.regexnumber.test(this.precioV)){
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
    this.db.crearPublicacion(this.modeloV, this.marcaV, this.precioV, this.colorV, this.transmisionV, this.descrpV, 0, this.kilometrajeV, this.anosV, this.foto, localStorage.getItem("idper"));
    this.db.presentToast('bottom','Publicacion creada correctamente');
    this.router.navigate(['/pagina-principal'])
  }

}