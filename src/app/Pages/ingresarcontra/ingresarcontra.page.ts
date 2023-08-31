import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ingresarcontra',
  templateUrl: './ingresarcontra.page.html',
  styleUrls: ['./ingresarcontra.page.scss'],
})
export class IngresarcontraPage implements OnInit {

  constructor(private router:Router,private alertController: AlertController) { }
  contra: string= '';
  ngOnInit() {
  }
  
  irCambiarContra(){
    if (this.contra != "!Miguel123") {
      this.presentAlert();
    }else{
      this.router.navigate(['/cambiar-contra']);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Contraseña erronea',
      message: 'La contraseña ingresada no es correcta',
      buttons: ['Confirmar'],
    });

    await alert.present();
  }

}
