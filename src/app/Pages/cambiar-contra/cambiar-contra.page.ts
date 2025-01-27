import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-cambiar-contra',
  templateUrl: './cambiar-contra.page.html',
  styleUrls: ['./cambiar-contra.page.scss'],
})
export class CambiarContraPage implements OnInit {
  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private menu: MenuController,
    private db: DatabaseService
  ) {}
  // variables
  contra1: string = '';
  contra2: string = '';

  // variables label
  labelContra: string = '';
  labelContra2: string = '';

  // regex
  regexpass: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?^&])[A-Za-z\d@$!#%*^?&]{8,50}$/;

  ngOnInit() {
    this.menu.enable(false);
  }
  ngAfterViewInit() {
    this.menu.enable(false);
  }
  irHome() {
    // la bandera si está en verdadero permite que se envien los datos en caso contrario no lo permite
    let bandera: boolean = true;

    if (!this.regexpass.test(this.contra1)) {
      this.labelContra =
        'Debe ingresar una contraseña con carateres especiales, mayuscula y numero con minimo de 8 y maximo de 50 caracteres';
      bandera = false;
    } else {
      this.labelContra = '';
    }
    if (this.contra2 != this.contra1) {
      this.labelContra2 = 'Deben coincidir las contraseñas';
      bandera = false;
    } else {
      this.labelContra2 = '';
    }

    if (bandera == true) {
      this.db.cambiarContra(this.contra1, localStorage.getItem('idper'));
      this.router.navigate(['/perfil']);
    }
  }
}
