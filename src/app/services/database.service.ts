import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';

import { BehaviorSubject, Observable } from 'rxjs';
import { Publicacion } from './publicacion';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  //variable de conexion a BD
  public db!:SQLiteObject;
  
  //variables para la creacion de tablas
  tablaRegion: string = "CREATE TABLE IF NOT EXISTS region (Id_region INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);";
  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna (Id_comuna INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL, Id_region INTEGER NOT NULL, FOREIGN KEY (Id_region) REFERENCES region(Id_region));";
  tablaDireccion: string = "CREATE TABLE IF NOT EXISTS Direccion (Id_direccion INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL, numero INTEGER NOT NULL, Id_comuna INTEGER NOT NULL, FOREIGN KEY (Id_comuna) REFERENCES region(Id_comuna));";
  tablaPregunta: string = "CREATE TABLE IF NOT EXISTS pregunta (Id_pregunta INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);";
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (Id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (Id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL, apellido VARCHAR(255) NOT NULL, correo VARCHAR(255) NOT NULL, clave VARCHAR(255) NOT NULL, respuesta VARCHAR(255) NOT NULL, telefono VARCHAR(255) NOT NULL, foto VARCHAR(255), Id_pregunta INTEGER NOT NULL, Id_rol INTEGER NOT NULL, FOREIGN KEY (Id_pregunta) REFERENCES pregunta(Id_pregunta), FOREIGN KEY (Id_rol) REFERENCES rol(Id_rol));";
  tablaPublicacion: string = "CREATE TABLE IF NOT EXISTS publicacion (Id_publicacion INTEGER PRIMARY KEY AUTOINCREMENT, modelo VARCHAR(255) NOT NULL, marca VARCHAR(255) NOT NULL, precio INTEGER NOT NULL, color VARCHAR(255) NOT NULL, transmision VARCHAR(255) NOT NULL, descripcion VARCHAR(255) NOT NULL, estado VARCHAR(255) NOT NULL, kilometraje INTEGER NOT NULL, cantidad_de_uso INTEGER NOT NULL, foto VARCHAR(255), Id_usuario INTEGER NOT NULL, FOREIGN KEY (Id_usuario) REFERENCES usuario(Id_usuario));";
  tablaReporte: string = "CREATE TABLE IF NOT EXISTS reporte (Id_reporte INTEGER PRIMARY KEY AUTOINCREMENT, tipo VARCHAR(255) NOT NULL, descripcion VARCHAR(255), Id_reporte INTEGER NOT NULL, FOREIGN KEY (Id_reporte) REFERENCES reporte(Id_reporte));";

  //variables para los insert iniciales
  registroPregunta1: string = "INSERT or IGNORE INTO pregunta(Id_pregunta,nombre) VALUES (1,'¿Como se llamaba tu primera mascota?');";
  registroRol1: string = "INSERT or IGNORE INTO rol(Id_rol,nombre) VALUES (1,'Admin');";
  registroRol2: string = "INSERT or IGNORE INTO rol(Id_rol,nombre) VALUES (2,'Usuario');";
  registroUsuario1: string = "INSERT or IGNORE INTO usuario(Id_usuario,nombre,apellido,correo,clave,respuesta,telefono,foto,Id_pregunta,Id_rol) VALUES (1,'Miguel','Pérez','correoreal@duocuc.cl','!Miguel123','Automatica','987653452','',(SELECT Id_pregunta from pregunta WHERE Id_pregunta=1), (SELECT Id_rol from rol WHERE Id_rol=2));";
  registroPublicacion1: string = "INSERT or IGNORE INTO publicacion(Id_publicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidad_de_uso,foto,id_usuario) VALUES (1,'2023 Chevrolet Silverado 3.0TD High Country Auto DC 4WD','Chevrolet',52000000,'gris','Automatica','asd','Revision',0,0,'',(SELECT Id_usuario from usuario WHERE Id_usuario=1));";
  registroPublicacion2: string = "INSERT or IGNORE INTO publicacion(Id_publicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidad_de_uso,foto,id_usuario) VALUES (2,'2010 Audi Q5 2.0T FSI STRONIC QUATTRO','Audi',11500000,'blanco','Automatica','asd','Revision',159567,2,'',(SELECT Id_usuario from usuario WHERE Id_usuario=1));";
  registroPublicacion3: string = "INSERT or IGNORE INTO publicacion(Id_publicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidad_de_uso,foto,id_usuario) VALUES (3,'2009 Alfa Romeo 147 2.0 TS 150 CV Sport Selespeed','Alfa Romeo',10900000,'negro','Automatica','asd','Revision',90000,3,'',(SELECT Id_usuario from usuario WHERE Id_usuario=1));";
  registroPublicacion4: string = "INSERT or IGNORE INTO publicacion(Id_publicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidad_de_uso,foto,id_usuario) VALUES (4,'EVOLTIS TOURING GARDX','Subaru',39490000,'gris','Automatica','asd','Revision',0,0,'',(SELECT Id_usuario from usuario WHERE Id_usuario=1));";

  //observables de las tablas
  observer = new BehaviorSubject([]);

  //observable para la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { 
    this.crearDB();
  }

  bdState(){
    return this.isDBReady.asObservable();
  }

  fetchPublicacion(): Observable<Publicacion[]>{
    return this.observer.asObservable();
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
      //creación de tablas
      await this.db.executeSql(this.tablaRegion,[]);
      await this.db.executeSql(this.tablaComuna,[]);
      await this.db.executeSql(this.tablaDireccion,[]);
      await this.db.executeSql(this.tablaPregunta,[]);
      await this.db.executeSql(this.tablaRol,[]);
      await this.db.executeSql(this.tablaUsuario,[]);
      await this.db.executeSql(this.tablaPublicacion,[]);
      await this.db.executeSql(this.tablaReporte,[]);

      //ejecucion de los insert
      await this.db.executeSql(this.registroPregunta1,[])
      await this.db.executeSql(this.registroRol1,[])
      await this.db.executeSql(this.registroRol2,[])
      await this.db.executeSql(this.registroUsuario1,[])
      await this.db.executeSql(this.registroPublicacion1,[])
      await this.db.executeSql(this.registroPublicacion2,[])
      await this.db.executeSql(this.registroPublicacion3,[])
      await this.db.executeSql(this.registroPublicacion4,[])

      this.isDBReady.next(true);

    }catch(error){
      this.presentAlert("Error en crear las tablas" + error)
    }
  }

  //Alertas
  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }



  //Usuarios
  crearUsuario(){

  }



  //Publicaciones


  //Cuando ingresamos a la pagina principal esta funcion permite ver los autos
  buscarPublicacion(){
    return this.db.executeSql('SELECT * FROM publicacion',[]).then(res=>{
      let items: Publicacion[] = [];
      if(res.rows.length > 0){
        for(var i=0; i < res.rows.length; i++){
          items.push({
            Id_publicacion: res.rows.item(i).Id_publicacion,
            modelo: res.rows.item(i).modelo,
            marca : res.rows.item(i).marca,
            precio : res.rows.item(i).precio,
            color : res.rows.item(i).color,
            transmision : res.rows.item(i).transmision,
            descripcion : res.rows.item(i).descripcion,
            estado : res.rows.item(i).estado,
            kilometraje : res.rows.item(i).kilometraje,
            cantidad_de_uso : res.rows.item(i).cantidad_de_uso,
            foto : res.rows.item(i).foto,
            Id_usuario : res.rows.item(i).Id_usuario
          })

        }
      }
      this.observer.next(items as any);
    })
  }



  //Administrador

}