import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamaraService } from 'src/app/services/camara.service';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.page.html',
  styleUrls: ['./modificar-producto.page.scss'],
})
export class ModificarProductoPage implements OnInit {

  idpublicacion: string= '';
  modelo: string = '';
  precio : string = '';
  color: string ='';
  marca: string ='';
  anos: string = '';
  descrp: string = '';
  kilometraje: string = ''; 
  transmision: string ='';
  foto: any = './../assets/icon/boton-agregar.png';
  idusuario: string='';
  estado: string='';

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

  constructor(private router:Router,private db: DatabaseService, private camara: CamaraService, private activatedRouter: ActivatedRoute) { 
    this.activatedRouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.idpublicacion = this.router.getCurrentNavigation()?.extras?.state?.['idpubliE'];
        this.modelo = this.router.getCurrentNavigation()?.extras?.state?.['modeloE'];
        this.marca = this.router.getCurrentNavigation()?.extras?.state?.['marcaE'];
        this.precio = this.router.getCurrentNavigation()?.extras?.state?.['precioE'];
        this.color = this.router.getCurrentNavigation()?.extras?.state?.['colorE'];
        this.transmision = this.router.getCurrentNavigation()?.extras?.state?.['transmisionE'];
        this.descrp = this.router.getCurrentNavigation()?.extras?.state?.['descripcionE'];
        this.estado = this.router.getCurrentNavigation()?.extras?.state?.['estadoE'];
        this.kilometraje = this.router.getCurrentNavigation()?.extras?.state?.['kilometrajeE'];
        this.anos = this.router.getCurrentNavigation()?.extras?.state?.['cantidaddeusoE'];
        this.foto = this.router.getCurrentNavigation()?.extras?.state?.['fotoE'];
        this.idusuario = this.router.getCurrentNavigation()?.extras?.state?.['idusuarioE'];
      }
    });

  }

  ngOnInit() {
  }

  async tomarfoto(){
    await this.camara.takePicture();
    this.foto = this.camara.foto;
    this.labelFoto = '';
  }

  irPaginaPublicaciones(){
    let pass = 0;

    if(this.modelo.length < 1){
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

    if(this.descrp == "" || this.descrp.length < 10){
      pass = 1;
      this.labelDescrp = 'La descripcion debe contener como minimo 10 caracteres.';
    }else{
      this.labelDescrp = '';
    }

    if (this.transmision == "") {
      pass = 1;
      this.labelTrans = 'Porfavor seleccione una opción.'
    }else{
      this.labelTrans = '';
    }

    if (this.color == "") {
      pass = 1;
      this.labelColor = 'Porfavor seleccione una opción.'
    }else{
      this.labelColor = '';
    }

    if (this.marca == "") {
      pass = 1;
      this.labelMarca = 'Porfavor seleccione una opción.'
    }else{
      this.labelMarca = '';
    }

    if (parseInt(this.kilometraje) == 0 || this.kilometraje == "" || this.regexname.test(this.kilometraje) ) {
      pass = 1;
      this.labelKilometraje = 'Ingrese el kilometraje del Auto.';
      if(parseInt(this.kilometraje) > 320000){
        pass = 1;
        this.labelKilometraje = 'El auto no puede ser publicado si su kilometraje pasa los 320000.';
      }
    }
    else{
      this.labelKilometraje = '';
    }

    if(parseInt(this.anos) == 0 || this.anos == "" || this.regexname.test(this.anos)){
      pass = 1;
      this.labelAnos = 'Debe ingresar como minimo 1 año.';
    }else{
      this.labelAnos = '';
    }

    if(parseInt(this.precio) == 0 || this.precio == "" || this.regexname.test(this.precio)){
      pass = 1;
      this.labelPrecio = 'Ingrese un precio para su Auto en venta.';
    }else{
      this.labelPrecio = '';
    }

    if(pass == 0){
      this.modificarPublicacion();
    }
  };
  
  modificarPublicacion(){
    this.db.editarPublicacion(this.modelo, this.marca, this.precio, this.color, this.transmision, this.descrp, this.estado, this.kilometraje, this.anos, this.foto, this.idusuario, this.idpublicacion);
    this.db.presentToast('top','Publicacion actualizada correctamente');
    this.router.navigate(['/publicaciones'])
  }
}
