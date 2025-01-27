import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-recuperarcontra',
  templateUrl: './recuperarcontra.page.html',
  styleUrls: ['./recuperarcontra.page.scss'],
})
export class RecuperarcontraPage implements OnInit {
  idper:any;
  constructor(
    private router: Router,
    private menu: MenuController,
    private db: DatabaseService,
    private activedRouter: ActivatedRoute
  ) {}
  // variables
  contra1: string = '';
  contra2: string = '';

  // variables label
  labelContra: string = '';
  labelContra2: string = '';

  datosnuevos: any = [
    {
      id: '',
    },
  ];
  // regex
  regexpass: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?^&])[A-Za-z\d@$!#%*^?&]{8,50}$/;

  ngOnInit() {
    this.menu.enable(false);

    this.db.bdState().subscribe((res) => {
      if (res) {
        this.db.fetchDatosPass().subscribe((datos) => {
          this.datosnuevos = datos;
          this.idper = this.datosnuevos.id;
        });
      }
    });
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
      this.db.cambiarContra(this.contra1, this.idper);
      this.router.navigate(['/home']);
      
    }
  }
}
