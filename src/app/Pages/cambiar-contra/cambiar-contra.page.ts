import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-contra',
  templateUrl: './cambiar-contra.page.html',
  styleUrls: ['./cambiar-contra.page.scss'],
})
export class CambiarContraPage implements OnInit {

  constructor(private router: Router,private toastController: ToastController,private alertController: AlertController) { }
  contra1 : string = '';
  contra2 : string = '';
  ngOnInit() {
  }
  
  irHome(){
    if (this.contra1 != "123" || this.contra1 != this.contra2){
      this.presentAlert();
    }else{
      this.router.navigate(['/pagina-principal']);
      this.presentToast('bottom');
    }

  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Contraseña cambiada con exito',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Contraseñas erroneas',
      message: 'Las contraseñas no coinciden',
      buttons: ['Confirmar'],
    });

    await alert.present();
  }
}
