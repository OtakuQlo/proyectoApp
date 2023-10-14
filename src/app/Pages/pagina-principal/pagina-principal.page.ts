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
    idpublicacion: '',
    modelo: '',
    marca: '',
    buscador: '',
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

  resultados: any;

  handleInput(event:any){
    const query = event.target.value;
    this.resultados = this.arregloAutos;
    if(query && query.trim() != ''){
      this.resultados = this.resultados.filter((d:any) => {
        /*if (query.toLowerCase().includes(d.marca.toLowerCase() || d.modelo.toLowerCase())){
          return (d.modelo.marca.toLowerCase().indexOf(query.toLowerCase()) > -1 || d.marca.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }else if(query.toLowerCase().includes(d.marca.toLowerCase() && d.modelo.toLowerCase())){
          
          return (d.indexOf()) 
        }
        else{
          this.db.presentToast('bottom','No se encontro ningun producto :(')
        }*/
        return (d.modelo.marca.toLowerCase().indexOf(query.toLowerCase()) > -1)
      });
    }
  }

  constructor(private router: Router, private menu: MenuController,private db: DatabaseService) {
    this.db.buscarPublicacion();
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
          this.arregloAutos = datos.filter((x) => Number(x.estado) === 1 || Number(x.estado) === 2);
          this.resultados = this.arregloAutos;
        })
      }
    })
  }

  play(x:any) {
    let navigationExtras : NavigationExtras={
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
    this.router.navigate(['/pagina-producto'], navigationExtras);
  }

  pasarPersona(id:any){
    this.db.pasarUsuario(id);
  }

}