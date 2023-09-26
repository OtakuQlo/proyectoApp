import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonModal, MenuController} from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';



@Component({
  selector: 'app-pagina-producto',
  templateUrl: './pagina-producto.page.html',
  styleUrls: ['./pagina-producto.page.scss'],
})
export class PaginaProductoPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  rol: any = localStorage.getItem("rol");
  verificador: string = '';
  tipoReporte: number = 0;
  errorLabel: string = '';
  idpublicacion: string= '';
  modelo: string= '';
  marca: string= '';
  precio!: number;
  color: string= '';
  transmision: string= '';
  descripcion: string= '';
  estado: string= '';
  kilometraje!: number;
  cantidaddeuso!: number;
  foto: string= '';
  idusuario!: any;


  nombre:any;
  apellido:any;
  direccion:any;
  telefono:any;

  datosnuevos: any = [{
    rol: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: ''
  }];

  constructor(private router: Router, private activedRouter: ActivatedRoute, private menu: MenuController, private db: DatabaseService) {
    this.activedRouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.idpublicacion = this.router.getCurrentNavigation()?.extras?.state?.['idpublicacionE'];
        this.modelo = this.router.getCurrentNavigation()?.extras?.state?.['modeloE'];
        this.marca = this.router.getCurrentNavigation()?.extras?.state?.['marcaE'];
        this.precio = this.router.getCurrentNavigation()?.extras?.state?.['precioE'];
        this.color = this.router.getCurrentNavigation()?.extras?.state?.['colorE'];
        this.transmision = this.router.getCurrentNavigation()?.extras?.state?.['transmisionE'];
        this.descripcion = this.router.getCurrentNavigation()?.extras?.state?.['descripcionE'];
        this.estado = this.router.getCurrentNavigation()?.extras?.state?.['estadoE'];
        this.kilometraje = this.router.getCurrentNavigation()?.extras?.state?.['kilometrajeE'];
        this.cantidaddeuso = this.router.getCurrentNavigation()?.extras?.state?.['cantidaddeusoE'];
        this.foto = this.router.getCurrentNavigation()?.extras?.state?.['fotoE'];
        this.idusuario = this.router.getCurrentNavigation()?.extras?.state?.['idusuarioE'];
        this.verificador = this.router.getCurrentNavigation()?.extras?.state?.['verificador'];
      }
    })
  }

  ngOnInit() {
    this.menu.enable(true);
    this.db.bdState().subscribe(res=>{
      //verifico si el estatus es true
      if(res){
        //me subscribir al observable de la Tabla
        this.db.fetchVendedores().subscribe(datos=>{
          this.datosnuevos = datos;
          this.nombre = this.datosnuevos.nombre;
          this.telefono = this.datosnuevos.telefono;
          this.direccion = this.datosnuevos.direccion;
          this.apellido = this.datosnuevos.apellido;
        })
      }
    })
  } 

  reportarAuto(){
    let navigationExtras: NavigationExtras = {
      state: {
        publicacion: this.idpublicacion
      }

    }
    this.router.navigate(['/reportar-auto'])
  }

}