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
  // variables
  contra1 : string = '';
  contra2 : string = '';

  // variables label
  labelContra: string = '';
  labelContra2: string = '';

  // regex
  regexpass: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?^&])[A-Za-z\d@$!#%*^?&]{8,50}$/;

  ngOnInit() {
  }
  
  irHome(){
    // la bandera si está en verdadero permite que se envien los datos en caso contrario no lo permite
    let bandera: boolean = true;

    if (!this.regexpass.test(this.contra1)) {
      this.labelContra = 'Debe ingresar una contraseña con carateres especiales, mayuscula y numero con minimo de 8 y maximo de 50 caracteres';
      bandera = false;
    }
    if (this.contra2 != this.contra1) {
      this.labelContra2 = 'Deben coincidir las contraseñas';
      bandera = false;
    }


    if (bandera == true){
      this.router.navigate(['/pagina-principal']);
      this.presentToast('bottom');
      
    }else{
      this.presentAlert();
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
      message: '',
      buttons: ['Confirmar'],
    });

    await alert.present();
  }
}
