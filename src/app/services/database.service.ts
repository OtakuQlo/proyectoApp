import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  //variable de conexion a BD
  public db!:SQLiteObject;
  
  //variables para la creacion de tablas
  tablaRegion: string = "CREATE TABLE IF NOT EXIST region (Id_region INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);";
  tablaComuna: string = "CREATE TABLE IF NOT EXIST comuna (Id_comuna INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL, Id_region INTEGER NOT NULL, FOREIGN KEY (Id_region) REFERENCES region(Id_region));";
  tablaDireccion: string = "CREATE TABLE IF NOT EXIST Direccion (Id_direccion INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL, numero INTEGER NOT NULL, Id_comuna INTEGER NOT NULL, FOREIGN KEY (Id_comuna) REFERENCES region(Id_comuna));";
  tablaPregunta: string = "CREATE TABLE IF NOT EXIST pregunta (Id_pregunta INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);";
  tablaRol: string = "CREATE TABLE IF NOT EXIST rol (Id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);";
  tablaUsuario: string = "CREATE TABLE IF NOT EXIST usuario (Id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL, apellido VARCHAR(255) NOT NULL, correo VARCHAR(255) NOT NULL, clave VARCHAR(255) NOT NULL, respuesta VARCHAR(255) NOT NULL, telefono VARCHAR(255) NOT NULL, foto varbinary(max) NOT NULL, Id_pregunta INTEGER NOT NULL, Id_ROL INTEGER NOT NULL, FOREIGN KEY (Id_pregunta) REFERENCES pregunta(Id_pregunta), FOREIGN KEY (Id_rol) REFERENCES rol(Id_rol));";
  tablaPublicacion: string = "CREATE TABLE IF NOT EXIST publicacion (Id_publicacion INTEGER PRIMARY KEY AUTOINCREMENT, modelo VARCHAR(255) NOT NULL, marca VARCHAR(255) NOT NULL, precio INTEGER NOT NULL, color VARCHAR(255) NOT NULL, transmision VARCHAR(255) NOT NULL, descripcion VARCHAR(255) NOT NULL, estado VARCHAR(255) NOT NULL, kilometraje INTEGER NOT NULL, cantidad_de_uso INTEGER NOT NULL, foto varbinary(max) NOT NULL, Id_usuario INTEGER NOT NULL, FOREIGN KEY (Id_usuario) REFERENCES usuario(Id_usuario));";
  tablaReporte: string = "CREATE TABLE IF NOT EXIST reporte (Id_reporte INTEGER PRIMARY KEY AUTOINCREMENT, tipo VARCHAR(255) NOT NULL, descripcion VARCHAR(255), Id_reporte INTEGER NOT NULL, FOREIGN KEY (Id_reporte) REFERENCES reporte(Id_reporte));";

  //variables para los insert iniciales

  //observables de las tablas
  observer = new BehaviorSubject([]);

  //observable para la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  nombre:string = '';
  apellido:string = '';
  

  //Tablas?
  persona: string = 'CREATE IF NOT EXISTS TABLE persona ();'

  //Datos tablas?
  datosPersona: string = 'INSERT OR IGNORE INTO persona values ()' 

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