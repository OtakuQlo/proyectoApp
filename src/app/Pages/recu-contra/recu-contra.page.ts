import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recu-contra',
  templateUrl: './recu-contra.page.html',
  styleUrls: ['./recu-contra.page.scss'],
})
export class RecuContraPage implements OnInit {
  correo = "mi.perezf@duocuc.cl"
  input = '';
  constructor(private alertController: AlertController,private router:Router) { }

  ngOnInit() {
  }
  
  irRecuPregunta(){
    console.log(this.correo)
    if (this.input != this.correo) {
        this.presentAlert()
    }else{
      this.router.navigate(['/recu-pregunta']);
    }

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Correo erroneo',
      message: 'El correo ingresado no es valido',
      buttons: ['Confirmar'],
    });

    await alert.present();
  }

}
