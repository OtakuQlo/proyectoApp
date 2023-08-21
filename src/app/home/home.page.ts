import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router,private toastController: ToastController) {}
  

  irCrearUsuario(){
    this.router.navigate(['/inicio-sesion']);
  }

  irPaginaPrinicipal(){
    
    // this.router.navigate(['/perfil']);
    // this.presentToast('bottom');
     
    
    console.log(rut);

    
    
    
    
     
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Bienvenido a Satiscar',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
