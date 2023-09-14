import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  //Variables
  public db!:SQLiteObject;

  //Tablas
  persona: string = 'CREATE IF NOT EXISTS TABLE persona ();'

  //Datos tablas
  datosPersona: string = 'INSERT OR IGNORE INTO persona values ()' 



  //Observable de las tablas
  observer = new BehaviorSubject([]);

  //Observable de la base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { 

  }



  crearDB(){
    this.platform.ready().then(() =>
    this.sqlite.create({
      name: 'satiscar.db',
      location: 'default'
    }).then((db:SQLiteObject) =>{
      this.db = db
      this.crearTablas()

    }).catch((e) => {
      this.presentAlert('error en la crearDB '+ e);
    }));
  }



  async crearTablas(){
    try{
      await this.db.executeSql(this.persona,[]);
      await this.db.executeSql(this.datosPersona,[])
      this.isDBReady.next(true);

    }catch(error: any){
      this.presentAlert("Error en crear las tablas" + error)
    }




  }

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: msj,
      buttons: ['OK'],
    });


    await alert.present();
  }

  
}