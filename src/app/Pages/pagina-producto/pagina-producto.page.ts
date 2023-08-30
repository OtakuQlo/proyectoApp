import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-pagina-producto',
  templateUrl: './pagina-producto.page.html',
  styleUrls: ['./pagina-producto.page.scss'],
})
export class PaginaProductoPage implements OnInit {
  rol: string = '';

  auto1 : [string,string,string,string,number,string] = ["Alfa Romeo Giulia", "32.900.000","Miguel Perez","Avenida Generica 1234",
  78784471,"La marca italiana regresa al segmento D de los sedanes con esta berlina de corte deportivo y tracción trasera, un vehículo premium muy agresivo y atractivo a la vista, a lo que debemos sumar la presencia de una cabina con estupendos acabados."];
  
  constructor(private router: Router,private activedRouter: ActivatedRoute,private alertController: AlertController) { 
    this.activedRouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.rol = this.router.getCurrentNavigation()?.extras.state?.['rol'];
      }
    })
  }

  ngOnInit() {
  }

  async presentConfirmationAlert(action: string) {
    const message =
      action === 'producto'
        ? '¿Estás seguro de que deseas eliminar este producto?'
        : '¿Estás seguro de que deseas eliminar este reporte?';

    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminar clicked');
            this.router.navigate(['/pagina-principal']);
          },
        },
      ],
    });

    await alert.present();
  }
  
  irReportar(){
    this.router.navigate(['/reportar-auto']);
  };

}
