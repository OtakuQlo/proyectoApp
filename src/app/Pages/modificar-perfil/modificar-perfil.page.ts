import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {

  constructor(private router:Router,private toastController: ToastController) { }

  ngOnInit() {
  }
  irPaginaPrinicipal(){
    this.router.navigate(['/pagina-principal']);
    this.presentToast('bottom');
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
