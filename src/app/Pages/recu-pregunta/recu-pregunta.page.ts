import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recu-pregunta',
  templateUrl: './recu-pregunta.page.html',
  styleUrls: ['./recu-pregunta.page.scss'],
})
export class RecuPreguntaPage implements OnInit {

  constructor(private router:Router,private alertController: AlertController) { }

  ngOnInit() {
  }

  opcion: number = 0 ;
  respuesta: string = '';
  op: number = 1;
  res: string = "mimi";


  irCambiarContra(){
    if (this.opcion != 1 || this.respuesta != this.res) {
      this.presentAlert();
    }else{
      console.log();
      console.log();
      this.router.navigate(['/cambiar-contra']);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Datos erroneos',
      message: 'Los datos ingresados no son validos',
      buttons: ['Confirmar'],
    });

    await alert.present();
  }
}
