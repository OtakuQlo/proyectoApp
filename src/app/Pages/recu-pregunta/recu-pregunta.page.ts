import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-recu-pregunta',
  templateUrl: './recu-pregunta.page.html',
  styleUrls: ['./recu-pregunta.page.scss'],
})
export class RecuPreguntaPage implements OnInit {
  preguntas: any = [{
    idpregunta: '',
    nombre: ''
  }];

  constructor(private router:Router,private alertController: AlertController, private db: DatabaseService ) {
    this.db.pasarPregunta();
   }

  ngOnInit() {
    this.db.bdState().subscribe(
      res => {
        if (res) {
          this.db.fetchPregunta().subscribe(datos => {
            this.preguntas = datos;
          })
        }
      }
    )
  }

  opcion: number = 0 ;
  respuesta: string = '';
  op: number = 1;
  res: string = "perrito";


  irCambiarContra(){
    if (this.opcion != 1 || this.respuesta != this.res) {
    }else{
      console.log();
      console.log();
      this.router.navigate(['/cambiar-contra']);
    }
  }

  

    
}
