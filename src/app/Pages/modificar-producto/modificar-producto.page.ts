import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController,ToastController } from '@ionic/angular';
import { __param } from 'tslib';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.page.html',
  styleUrls: ['./modificar-producto.page.scss'],
})
export class ModificarProductoPage implements OnInit {

  modeloV: string = "";
  precioV: number = 0;
  colorV: string ="";
  marcaV: string ="";
  anosV: number= 0;
  descrpV: string = "";
  kilometrajeV: number = 0; 
  transmisionV: string ="";

  pass: number = 0;

  arrTrans : any[] = ["Automatica", "Semiautomatica", "Manual"];

  auto: [string,number,string,string,number,string] = ["",0,"","",0,""]

  constructor(private router:Router,private toastController: ToastController,private AlertController:AlertController,private activedRouter: ActivatedRoute) { 
    this.activedRouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.auto = this.router.getCurrentNavigation()?.extras.state?.['auto'];
      }
    })
  }

  ngOnInit() {
  }

  irPaginaPrincipal(){
    if(this.modeloV != ""  && this.descrpV != "" ){
      if(this.modeloV.length > 2){
        this.pass = 0;
      }
      if(this.descrpV.length < 10){
        this.pass = 1;
      }
    }else{
      this.pass = 1;
    }
    if (this.transmisionV != "" && this.colorV != "" && this.marcaV != "") {
      this.pass = 0;
    }
    if( this.precioV != 0 && this.precioV > 0 && this.anosV != 0 && this.anosV > 0 && this.kilometrajeV != 0 && this.kilometrajeV > 0){
      this.pass = 0;
      if (this.kilometrajeV > 320000 ) {
        this.pass = 1;
      }
    }
    if(this.pass == 0){
      this.router.navigate(['/pagina-principal']);
      this.presentToast('bottom');
    }
  };

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Los datos modificados del Auto fueron actualizados',
      duration: 1500,
      position: position,
    });
  }

}
