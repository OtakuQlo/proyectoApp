import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';

import { BehaviorSubject, Observable } from 'rxjs';
import { Publicacion } from './publicacion';
import { Pregunta } from './pregunta';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  //variable de conexion a BD
  public db!:SQLiteObject;
  
  //variables para la creacion de tablas
  tablaPregunta: string = "CREATE TABLE IF NOT EXISTS pregunta (idpregunta INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);";
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (idrol INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (idusuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL, apellido VARCHAR(255) NOT NULL, rut VARCHAR(12) UNIQUE NOT NULL,  correo VARCHAR(255) NOT NULL, clave VARCHAR(255) NOT NULL, respuesta VARCHAR(255) NOT NULL, telefono VARCHAR(255) NOT NULL, direccion VARCHAR(255) NOT NULL, foto VARCHAR(255), idpregunta INTEGER NOT NULL, idrol INTEGER NOT NULL, FOREIGN KEY (idpregunta) REFERENCES pregunta(idpregunta), FOREIGN KEY (idrol) REFERENCES rol(idrol));";
  tablaPublicacion: string = "CREATE TABLE IF NOT EXISTS publicacion (idpublicacion INTEGER PRIMARY KEY AUTOINCREMENT, modelo VARCHAR(255) NOT NULL, marca VARCHAR(255) NOT NULL, precio INTEGER NOT NULL, color VARCHAR(255) NOT NULL, transmision VARCHAR(255) NOT NULL, descripcion VARCHAR(255) NOT NULL, estado INTEGER NOT NULL, kilometraje INTEGER NOT NULL, cantidaddeuso INTEGER NOT NULL, foto VARCHAR(255), idusuario INTEGER NOT NULL, FOREIGN KEY (idusuario) REFERENCES usuario(idusuario));";
  tablaReporte: string = "CREATE TABLE IF NOT EXISTS reporte (idreporte INTEGER PRIMARY KEY AUTOINCREMENT, tipo VARCHAR(255) NOT NULL, descripcion VARCHAR(255), idpublicacion INTEGER NOT NULL, FOREIGN KEY (idpublicacion) REFERENCES publicacion(idpublicacion));";

  //variables para los insert iniciales
  registroRol1: string = "INSERT or IGNORE INTO rol(idrol,nombre) VALUES (1,'Admin');";
  registroRol2: string = "INSERT or IGNORE INTO rol(idrol,nombre) VALUES (2,'Usuario');";
  
  registroUsuario1: string = "INSERT or IGNORE INTO usuario(idusuario,nombre,apellido,rut,correo,clave,respuesta,telefono,direccion,foto,idpregunta,idrol) VALUES (1,'Miguel','Pérez','21294525-0','correoreal@duocuc.cl','!Miguel123','AUTOMATICA','87653452','Casa','',(SELECT idpregunta from pregunta WHERE idpregunta=1), (SELECT idrol from rol WHERE idrol=2));";
  registroUsuario2: string = "INSERT or IGNORE INTO usuario(idusuario,nombre,apellido,rut,correo,clave,respuesta,telefono,direccion,foto,idpregunta,idrol) VALUES (2,'Gabriel','Maneiro','21921084-1','ga.maneiro@duocuc.cl','!Miguel123','AUTOMATICA','96842823','Casa2','',(SELECT idpregunta from pregunta WHERE idpregunta=2), (SELECT idrol from rol WHERE idrol=1));";

  registroPublicacion1: string = "INSERT or IGNORE INTO publicacion(idpublicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (1,'2023 Silverado 3.0TD High Country Auto DC 4WD','Chevrolet',52000000,'gris','Automatica','asd', 0 ,0,0,'',(SELECT idusuario from usuario WHERE idusuario=1));";
  registroPublicacion2: string = "INSERT or IGNORE INTO publicacion(idpublicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (2,'2010 Q5 2.0T FSI STRONIC QUATTRO','Audi',11500000,'blanco','Automatica','asd', 0 ,159567,2,'',(SELECT idusuario from usuario WHERE idusuario=1));";
  registroPublicacion3: string = "INSERT or IGNORE INTO publicacion(idpublicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (3,'2009 147 2.0 TS 150 CV Sport Selespeed','Alfa Romeo',10900000,'negro','Automatica','asd', 0 ,90000,3,'',(SELECT idusuario from usuario WHERE idusuario=1));";
  registroPublicacion4: string = "INSERT or IGNORE INTO publicacion(idpublicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (4,'EVOLTIS TOURING GARDX','Subaru',39490000,'gris','Automatica','asd', 0 ,0,0,'',(SELECT idusuario from usuario WHERE idusuario=1));";
  
  registroPregunta1: string = "INSERT or IGNORE INTO pregunta(idpregunta,nombre) VALUES (1,'¿Cómo se llamaba tu primera mascota?');";
  registroPregunta2: string = "INSERT or IGNORE INTO pregunta(idpregunta,nombre) VALUES (2,'¿Cómo se llama el hospital donde naciste?');";
  
  

  //observables de las tablas
  observer = new BehaviorSubject([]);

  //observable para la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController,private router:Router, private toastController: ToastController) { 
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
      name: 'satiscar5.db',
      location: 'default'
    }).then((db:SQLiteObject) =>{
      this.db = db
      this.crearTablas()

    }).catch((e) => {
      this.presentAlert("",'error en la crearDB '+ e);
    }));
  }

  async crearTablas(){
    try{
      //creación de tablas
      await this.db.executeSql(this.tablaPregunta,[]);
      await this.db.executeSql(this.tablaRol,[]);
      await this.db.executeSql(this.tablaUsuario,[]);
      await this.db.executeSql(this.tablaReporte,[]);
      await this.db.executeSql(this.tablaPublicacion,[]);
      
      /*ejecucion de los insert */
      await this.db.executeSql(this.registroPregunta1,[])
      await this.db.executeSql(this.registroPregunta2,[])
      await this.db.executeSql(this.registroRol1,[])
      await this.db.executeSql(this.registroRol2,[])
      await this.db.executeSql(this.registroUsuario1,[])
      await this.db.executeSql(this.registroUsuario2,[])
      await this.db.executeSql(this.registroPublicacion1,[])
      await this.db.executeSql(this.registroPublicacion2,[])
      await this.db.executeSql(this.registroPublicacion3,[])
      await this.db.executeSql(this.registroPublicacion4,[])
      this.isDBReady.next(true);

      

    }catch(error){
      this.presentAlert("error de tablas","Error en crear las tablas" + error)
    }
  }

  //Alertas
  async presentAlert(titulo: string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  //toast
  
  async presentToast(position: 'top' | 'middle' | 'bottom', msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }



  //Usuarios

  inicioSesion(rut:any, pass: any){

    this.db.executeSql('select * from usuario where rut = ?',[rut])
    .then((res) => {
      
      let idrol: any;
      let pass1: any;
      let nombre: any;
      let correo: any;
      let idper: any;
      let apellido: any;

      if(res.rows.length > 0){
        idrol = res.rows.item(0).idrol,
        pass1 = res.rows.item(0).clave,
        nombre = res.rows.item(0).nombre,
        correo = res.rows.item(0).correo,
        idper = res.rows.item(0).idusuario,
        apellido = res.rows.item(0).apellido
        
      }else{
        this.presentAlert("Datos erroneos:","Los datos ingesados son erroneos.");
        return
      }
      if (pass == pass1) {
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("correo", correo);
        localStorage.setItem("rol", idrol);
        localStorage.setItem("idper", idper);
        localStorage.setItem("apellido", apellido);
        this.router.navigate(['/perfil']);
        this.presentToast('bottom','Bienvenido a satiscar');

        
      }else{
        this.presentAlert("Datos erroneos:","Los datos ingesados son erroneos.");
      }
    })
  }

  //falta poner los parametros
  crearUsuario(nombre:any, apellido:any, rut:any, correo:any, clave: any, respuesta:any, telefono:any, direccion:any, foto:any, idpregunta:any, idrol:any){
    return this.db.executeSql('INSERT INTO usuario(nombre,apellido,rut,correo,clave,respuesta,telefono,direccion,foto,idpregunta,idrol) VALUES (?,?,?,?,?,?,?,?,?,?,?)',[nombre,apellido,rut,correo,clave,respuesta,telefono,direccion,foto,idpregunta,idrol])
    .then(() => {
      this.presentAlert("",'Se ha ingresado los usuarios de forma correcta');

    }).catch((e) =>{ this.presentAlert("",'error en crear usuario: ' + JSON.stringify(e))
    })
  }

  pasarPregunta(){
    return this.db.executeSql('SELECT * FROM pregunta',[])
    .then(res => {
      let pregunta: Pregunta[] = []; 
      if (res.rows.length > 0){
        for (let i = 0; i < res.rows.length; i++) {
          pregunta.push({
            idpregunta: res.rows.item(i).idpregunta,
            nombre: res.rows.item(i).nombre
          })
        }
      }
      this.observer.next(pregunta as any);
      })
      .catch(e => {
        this.presentAlert("",'Error en pasar pregunta ' + JSON.stringify(e))
      })

      }
     



  //Publicaciones

  //Cuando ingresamos a la pagina principal esta funcion permite ver los autos
  buscarPublicacion(){
    return this.db.executeSql('SELECT * FROM publicacion',[]).then(res=>{
      let publi: Publicacion[] = [];
      if(res.rows.length > 0){
        for(var i=0; i < res.rows.length; i++){
          publi.push({
            idpublicacion: res.rows.item(i).idpublicacion,
            modelo: res.rows.item(i).modelo,
            marca : res.rows.item(i).marca,
            precio : res.rows.item(i).precio,
            color : res.rows.item(i).color,
            transmision : res.rows.item(i).transmision,
            descripcion : res.rows.item(i).descripcion,
            estado : res.rows.item(i).estado,
            kilometraje : res.rows.item(i).kilometraje,
            cantidaddeuso : res.rows.item(i).cantidaddeuso,
            foto : res.rows.item(i).foto,
            idusuario : res.rows.item(i).idusuario
          })

        }
      }
      this.observer.next(publi as any);
    }).catch(e =>{
      this.presentAlert("","Error buscar" + e);
    })
  }

  //Añadir nuevos autos
  crearPublicacion(modelo:any, marca:any, precio: any, color:any, transmision:any, descripcion:any, estado:any, kilometraje:any, cantidaddeuso:any, foto:any, idusuario:any){
    return this.db.executeSql('INSERT or IGNORE INTO publicacion(modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (?,?,?,?,?,?,?,?,?,?,?)',[modelo,marca,precio, color, transmision, descripcion, estado, kilometraje, cantidaddeuso, foto, idusuario])
    .then(() => {
      this.buscarPublicacion();
    }).catch((e) =>{ this.presentAlert("",'error en crear publicacion: ' + JSON.stringify(e))
    })
  }



  //Administrador

}