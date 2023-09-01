import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-ingresarcontra',
  templateUrl: './ingresarcontra.page.html',
  styleUrls: ['./ingresarcontra.page.scss'],
})
export class IngresarcontraPage implements OnInit {

  constructor(private router:Router,private alertController: AlertController, private menu: MenuController) { }
  contra: string= '';
  ngOnInit() {
    this.menu.enable(false);
  }
  ngAfterViewInit(){
    this.menu.enable(false);
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
