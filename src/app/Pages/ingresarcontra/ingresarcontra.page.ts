import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-ingresarcontra',
  templateUrl: './ingresarcontra.page.html',
  styleUrls: ['./ingresarcontra.page.scss'],
})
export class IngresarcontraPage implements OnInit {
  datosnuevos: any = [
    {
      id: '',
      pass: '',
    },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private menu: MenuController,
    private db: DatabaseService
  ) {

    this.db.bdState().subscribe((res) => {
      this.db.fetchpass().subscribe((datos) => {
        this.datosnuevos = datos;
        this.id = this.datosnuevos.id;
        this.contra1 = this.datosnuevos.pass;
      });
    });
  }
  contra: string = '';
  contra1: string = '';
  id: any;
  ngOnInit() {
    this.menu.enable(false);
  }
  ngAfterViewInit() {
    this.menu.enable(false);
  }

  irCambiarContra() {
    if (this.contra == this.contra1) {
      this.router.navigate(['/cambiar-contra']);
    } else {
      this.db.presentAlert(
        'Dato erroneo:',
        'La contraseña ingresada no es la correcta.'
      );
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
