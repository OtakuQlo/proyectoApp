import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';

import { BehaviorSubject, Observable } from 'rxjs';
import { Publicacion } from './publicacion';
import { Pregunta } from './pregunta';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  //variable de conexion a BD
  public db!:SQLiteObject;
  
  //variables para la creacion de tablas
  tablaRegion: string = "CREATE TABLE IF NOT EXISTS region (Id_region INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);";
  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna (Id_comuna INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL, Id_region INTEGER NOT NULL, FOREIGN KEY (Id_region) REFERENCES region(Id_region));";
  tablaDireccion: string = "CREATE TABLE IF NOT EXISTS direccion (Id_direccion INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL, numero INTEGER NOT NULL, Id_comuna INTEGER NOT NULL, FOREIGN KEY (Id_comuna) REFERENCES region(Id_comuna));";
  tablaPregunta: string = "CREATE TABLE IF NOT EXISTS pregunta (Id_pregunta INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);";
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (Id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (Id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL, apellido VARCHAR(255) NOT NULL, correo VARCHAR(255) NOT NULL, clave VARCHAR(255) NOT NULL, respuesta VARCHAR(255) NOT NULL, telefono VARCHAR(255) NOT NULL, Id_direccion INTEGER NOT NULL, foto VARCHAR(255), Id_pregunta INTEGER NOT NULL, Id_rol INTEGER NOT NULL, FOREIGN KEY (Id_direccion) REFERENCES direccion(Id_direccion), FOREIGN KEY (Id_pregunta) REFERENCES pregunta(Id_pregunta), FOREIGN KEY (Id_rol) REFERENCES rol(Id_rol));";
  tablaPublicacion: string = "CREATE TABLE IF NOT EXISTS publicacion (Id_publicacion INTEGER PRIMARY KEY AUTOINCREMENT, modelo VARCHAR(255) NOT NULL, marca VARCHAR(255) NOT NULL, precio INTEGER NOT NULL, color VARCHAR(255) NOT NULL, transmision VARCHAR(255) NOT NULL, descripcion VARCHAR(255) NOT NULL, estado VARCHAR(255) NOT NULL, kilometraje INTEGER NOT NULL, cantidad_de_uso INTEGER NOT NULL, foto VARCHAR(255), Id_usuario INTEGER NOT NULL, FOREIGN KEY (Id_usuario) REFERENCES usuario(Id_usuario));";
  tablaReporte: string = "CREATE TABLE IF NOT EXISTS reporte (Id_reporte INTEGER PRIMARY KEY AUTOINCREMENT, tipo VARCHAR(255) NOT NULL, descripcion VARCHAR(255), Id_publicacion INTEGER NOT NULL, FOREIGN KEY (Id_publicacion) REFERENCES publicacion(Id_publicacion));";

  //variables para los insert iniciales
  registroPregunta1: string = "INSERT or IGNORE INTO pregunta(Id_pregunta,nombre) VALUES (1,'¿Cómo se llamaba tu primera mascota?');";
  registroRol1: string = "INSERT or IGNORE INTO rol(Id_rol,nombre) VALUES (1,'Admin');";
  registroRol2: string = "INSERT or IGNORE INTO rol(Id_rol,nombre) VALUES (2,'Usuario');";
  
  registroRegion: string ="INSERT OR IGNORE INTO region(Id_region, nombre) VALUES (1,'METROPOLITANA');";
  registroComuna: string = "INSERT OR IGNORE INTO comuna(Id_comuna,nombre,Id_region) VALUES (1,'INDEPENDENCIA',(SELECT Id_region from region WHERE Id_region=1));";
  registroDireccion: string = "INSERT OR IGNORE INTO direccion(Id_direccion,nombre,numero,Id_comuna) VALUES (1,'AVENIDA GENERICA', 1234,(SELECT Id_comuna from comuna WHERE Id_comuna=1));";
  
  registroUsuario1: string = "INSERT or IGNORE INTO usuario(Id_usuario,nombre,apellido,correo,clave,respuesta,telefono,Id_direccion,foto,Id_pregunta,Id_rol) VALUES (1,'Miguel','Pérez','correoreal@duocuc.cl','!Miguel123','AUTOMATICA','987653452', (SELECT Id_direccion from direccion WHERE Id_direccion=1) ,'',(SELECT Id_pregunta from pregunta WHERE Id_pregunta=1), (SELECT Id_rol from rol WHERE Id_rol=2));";
  
  registroPublicacion1: string = "INSERT or IGNORE INTO publicacion(Id_publicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidad_de_uso,foto,id_usuario) VALUES (1,'2023 Silverado 3.0TD High Country Auto DC 4WD','Chevrolet',52000000,'gris','Automatica','asd','Revision',0,0,'',(SELECT Id_usuario from usuario WHERE Id_usuario=1));";
  registroPublicacion2: string = "INSERT or IGNORE INTO publicacion(Id_publicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidad_de_uso,foto,id_usuario) VALUES (2,'2010 Q5 2.0T FSI STRONIC QUATTRO','Audi',11500000,'blanco','Automatica','asd','Revision',159567,2,'',(SELECT Id_usuario from usuario WHERE Id_usuario=1));";
  registroPublicacion3: string = "INSERT or IGNORE INTO publicacion(Id_publicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidad_de_uso,foto,id_usuario) VALUES (3,'2009 147 2.0 TS 150 CV Sport Selespeed','Alfa Romeo',10900000,'negro','Automatica','asd','Revision',90000,3,'',(SELECT Id_usuario from usuario WHERE Id_usuario=1));";
  registroPublicacion4: string = "INSERT or IGNORE INTO publicacion(Id_publicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidad_de_uso,foto,id_usuario) VALUES (4,'EVOLTIS TOURING GARDX','Subaru',39490000,'gris','Automatica','asd','Revision',0,0,'',(SELECT Id_usuario from usuario WHERE Id_usuario=1));";
  
  registroPregunta2: string = "INSERT or IGNORE INTO pregunta(Id_pregunta,nombre) VALUES (2,'¿Cómo se llama el hospital donde naciste?');";
  
  

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

  fetchPregunta(): Observable<Pregunta[]>{
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
      await this.db.executeSql(this.tablaReporte,[]);
      await this.db.executeSql(this.tablaPublicacion,[]);
      
      /*ejecucion de los insert */
      await this.db.executeSql(this.registroRegion,[])
      await this.db.executeSql(this.registroComuna,[])
      await this.db.executeSql(this.registroDireccion,[])
      await this.db.executeSql(this.registroPregunta1,[])
      await this.db.executeSql(this.registroRol1,[])
      await this.db.executeSql(this.registroRol2,[])
      await this.db.executeSql(this.registroUsuario1,[])
      await this.db.executeSql(this.registroPublicacion1,[])
      await this.db.executeSql(this.registroPublicacion2,[])
      await this.db.executeSql(this.registroPublicacion3,[])
      await this.db.executeSql(this.registroPublicacion4,[])
      await this.db.executeSql(this.registroPregunta2,[])
      this.isDBReady.next(true);
      this.buscarPublicacion();
      this.pasarPregunta();

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

  //falta poner los parametros
  crearUsuario(nombre:any, apellido:any, correo:any, clave: any, respuesta:any,telefono:any,foto:any,Id_pregunta:any,Id_rol = 2){
    
    return this.db.executeSql('INSERT or IGNORE INTO usuario(nombre,apellido,correo,clave,respuesta,telefono,foto,Id_pregunta,Id_rol) VALUES (?,?,?,?,?,?,?,?,?)',[nombre,apellido,correo,clave,respuesta,telefono,foto,Id_pregunta,Id_rol])
    .then(() => {
      this.presentAlert('Se ha ingresado los usuarios de forma correcta');

    }).catch((e) =>{ this.presentAlert('error en crear usuario: ' + JSON.stringify(e))
    })
  }

  pasarPregunta(){
    return this.db.executeSql('SELECT * FROM pregunta',[])
    .then((res) => {
      let pregunta: Pregunta[] = []; 
      if (res.rows.length > 0){
        for (let i = 0; i < res.rows.length; i++) {
          pregunta.push({
            Id_pregunta: res.rows.item(i).Id_pregunta,
            nombre: res.rows.item(i).nombre
          })
        }
        this.observer.next(pregunta as any);
      }
      })
      .catch(e => {
        this.presentAlert('Error en pasar pregunta ' + JSON.stringify(e))
      })

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
    }).catch(e =>{
      this.presentAlert("Error buscar" + e);
    })
  }



  //Administrador

}