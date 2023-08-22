import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  constructor(private router:Router,private toastController: ToastController,private alertController: AlertController) {}
  rut: string = '';
  pass: string = '';


  irCrearUsuario(){
    this.router.navigate(['/inicio-sesion']);
  }

  irPaginaPrinicipal(){
    
    if (this.rut != "21294525-0" || this.pass != "123") {
      this.presentAlert();
    }else{
      this.router.navigate(['/perfil']);
      this.presentToast('bottom');
    }

     
  }
  irRecuContra(){
    this.router.navigate(['/recu-contra']);
  }
  irCrearCuenta(){
    this.router.navigate(['/inicio-sesion']);
  }



  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Bienvenido a Satiscar',
      duration: 1500,
      position: position,
    });

    await toast.present();
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
