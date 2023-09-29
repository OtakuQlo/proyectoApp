import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-recu-pregunta',
  templateUrl: './recu-pregunta.page.html',
  styleUrls: ['./recu-pregunta.page.scss'],
})
export class RecuPreguntaPage implements OnInit {
  preguntas: any = [
    {
      idpregunta: '',
      nombre: '',
    },
  ];
  opcion: any;
  respuesta: any;
  opcion1: any;
  respuesta2: any;
  idper: any;
  datosnuevos: any = [
    {
      idpregunta: '',
      respuesta: '',
      idper: '',
    },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private db: DatabaseService
  ) {
    this.db.pasarPregunta();
  }

  ngOnInit() {
    this.db.bdState().subscribe((res) => {
      if (res) {
        this.db.fetchPregunta().subscribe((datos) => {
          this.preguntas = datos;
        });
        this.db.fetchRecuperar().subscribe((datos) => {
          this.datosnuevos = datos;
          this.opcion1 = this.datosnuevos.idpregunta;
          this.respuesta2 = this.datosnuevos.respuesta;
          this.idper = this.datosnuevos.idper;
        });
      }
    });
  }

  irCambiarContra() {
    if (this.opcion == this.opcion1 && this.respuesta == this.respuesta2) {
      let navigationExtras: NavigationExtras;
      navigationExtras = {
        state: {
          idper: this.idper
        },
      };
        
      this.router.navigate(['/recuperarcontra', navigationExtras]);
    } else {
      this.db.presentAlert(
        'Datos erroneos:',
        'Los datos ingresados no son correctos.'
      );
      alert(this.idper)
    }

  }
}
