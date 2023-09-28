import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';

import { BehaviorSubject, Observable } from 'rxjs';
import { Publicacion } from './publicacion';
import { Pregunta } from './pregunta';
import { NavigationExtras, Router } from '@angular/router';

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

  registroPublicacion1: string = "INSERT or IGNORE INTO publicacion(idpublicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (1,UPPER('2023 Silverado 3.0TD High Country Auto DC 4WD'),UPPER('Chevrolet'),52000000,'gris','Automatica','asd',0,0,0,'',(SELECT idusuario from usuario WHERE idusuario=1));";
  registroPublicacion2: string = "INSERT or IGNORE INTO publicacion(idpublicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (2,UPPER('2010 Q5 2.0T FSI STRONIC QUATTRO'),UPPER('Audi'),11500000,'blanco','Automatica','asd',0,159567,2,'',(SELECT idusuario from usuario WHERE idusuario=1));";
  registroPublicacion3: string = "INSERT or IGNORE INTO publicacion(idpublicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (3,UPPER('2009 147 2.0 TS 150 CV Sport Selespeed'),UPPER('Alfa Romeo'),10900000,'negro','Automatica','asd',0,90000,3,'',(SELECT idusuario from usuario WHERE idusuario=1));";
  registroPublicacion4: string = "INSERT or IGNORE INTO publicacion(idpublicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (4,UPPER('EVOLTIS TOURING GARDX'),UPPER('Subaru'),39490000,'gris','Automatica','asd',0,0,0,'',(SELECT idusuario from usuario WHERE idusuario=1));";
  
  registroPregunta1: string = "INSERT or IGNORE INTO pregunta(idpregunta,nombre) VALUES (1,'¿Cómo se llamaba tu primera mascota?');";
  registroPregunta2: string = "INSERT or IGNORE INTO pregunta(idpregunta,nombre) VALUES (2,'¿Cómo se llama el hospital donde naciste?');";
  
  

  //observables de las tablas
  observer = new BehaviorSubject([]);
  usuarios = new BehaviorSubject([]);
  vendedores = new BehaviorSubject([]);
  mispublicaciones = new BehaviorSubject([]);
  ruts = new BehaviorSubject([]);
  publiUser = new BehaviorSubject([]);





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

  fetchUser(): Observable<any[]>{
    return this.usuarios.asObservable();
  }

  fetchVendedores(): Observable<any[]>{
    return this.vendedores.asObservable();
  }

  fetchRut(): Observable<any[]>{
    return this.ruts.asObservable();
  }

  fetchPubliUser(): Observable<any[]>{
    return this.publiUser.asObservable();
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

  async presentConfirmationMessage(header: string, message: string, action: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: action,
          handler: () => {
            if (action === 'Aceptar') {

            } else if (action === 'Rechazar') {
              // Lógica para rechazar aquí
            } else if (action === 'Eliminar') {
              // Lógica para eliminar aquí
            } else if (action === 'Eliminar Reporte') {
              // Lógica para eliminar reporte aquí
            }
          },
        },
      ],
    });
  
    await alert.present();
  }

  //Usuarios

  inicioSesion(rut:any, pass: any){
    
    let datos: any = [{
      idper: '',
      rol: '',
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      direccion: '',
      foto: ''
    }];
    
    this.db.executeSql('select * from usuario where rut = ?',[rut])
    .then((res) => {
      
      let pass1: any;
      
      if(res.rows.length > 0){
        datos.idper = res.rows.item(0).idusuario,
        pass1 = res.rows.item(0).clave,
        datos.nombre = res.rows.item(0).nombre,
        datos.rol = res.rows.item(0).idrol,
        datos.apellido = res.rows.item(0).apellido,
        datos.correo = res.rows.item(0).correo,
        datos.telefono = res.rows.item(0).telefono,
        datos.direccion = res.rows.item(0).direccion,
        datos.foto = res.rows.item(0).foto
        
      }else{
        this.presentAlert("Datos erroneos:","Los datos ingesados son erroneos.");
        return
      }
      
      if (pass == pass1) {
        this.router.navigate(['/perfil']);
        this.presentToast('bottom','Bienvenido a satiscar');
        this.usuarios.next(datos as any); 
      }else{
        this.presentAlert("Datos erroneos:","Los datos ingesados son erroneos.");
      }
    })
  }

  validarRut(){
    let arrruts:any[] = [];
    return this.db.executeSql('select * from usuario', [])
    .then((res) => {
      if(res.rows.length > 0){
        for (let i = 0; i < res.rows.length; i++) {
          arrruts.push(res.rows.item(i).rut);
        }
      }
      this.ruts.next(arrruts as any)
    })
  }
  
  crearUsuario(nombre:any, apellido:any, rut:any, correo:any, clave: any, respuesta:any, telefono:any, direccion:any, foto:any, idpregunta:any, idrol:any){
    return this.db.executeSql('INSERT INTO usuario(nombre,apellido,rut,correo,clave,respuesta,telefono,direccion,foto,idpregunta,idrol) VALUES (?,?,?,?,?,?,?,?,?,?,?)',[nombre,apellido,rut,correo,clave,respuesta,telefono,direccion,foto,idpregunta,idrol])
    .then(() => {
      this.presentAlert("",'Se ha ingresado los usuarios de forma correcta');

    }).catch((e) =>{ this.presentAlert("",'error en crear usuario: ' + JSON.stringify(e))
    })
  }



  pasarPerfil(id:any){
    let navigationExtras : NavigationExtras;
    return this.db.executeSql('SELECT nombre, apellido, correo, telefono, direccion, foto FROM usuario where idusuario = ?',[id])
    .then((res) => {
      if (res.rows.length > 0){
        navigationExtras = {
          state: {
            nombre : res.rows.item(0).nombre,
            apellido : res.rows.item(0).apellido,
            correo : res.rows.item(0).correo,
            telefono : res.rows.item(0).telefono,
            direccion : res.rows.item(0).direccion,
            foto : res.rows.item(0).foto
          }
        }
      }
      this.router.navigate(['/modificar-perfil'],navigationExtras);
    })
  }

  editarPerfil(id: any,nombre: any, apellido: any, correo: any, telefono: any, direccion:any, foto:any){
    let datos: any = [{
      idper: '',
      rol: '',
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      direccion: '',
      foto: ''
    }];
    return this.db.executeSql('UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, telefono = ?, direccion = ?, foto = ? WHERE idusuario = ?;',[nombre,apellido,correo,telefono,direccion,foto, id])
    .then(() =>{
      this.db.executeSql('select * from usuario where idusuario = ?',[id])
      .then((res) => {
        if(res.rows.length > 0){
          datos.idper = res.rows.item(0).idusuario,
          datos.nombre = res.rows.item(0).nombre,
          datos.rol = res.rows.item(0).idrol,
          datos.apellido = res.rows.item(0).apellido,
          datos.correo = res.rows.item(0).correo,
          datos.telefono = res.rows.item(0).telefono,
          datos.direccion = res.rows.item(0).direccion,
          datos.foto = res.rows.item(0).foto
        }
        this.usuarios.next(datos as any); 
      })
    })
    .catch(e => this.presentAlert("","Error en editar datos" + e));
  }


  pasarUsuario(id: any){
    let datos: any = [{
      idper: '',
      rol: '',
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      direccion: '',
    }];
    return this.db.executeSql('select * from usuario where idusuario = ?', [id])
    .then((res) => {
      if(res.rows.length > 0){
        datos.idper = res.rows.item(0).idusuario,
        datos.rol = res.rows.item(0).idrol,
        datos.correo = res.rows.item(0).correo,
        datos.nombre = res.rows.item(0).nombre,
        datos.apellido = res.rows.item(0).apellido,
        datos.direccion = res.rows.item(0).direccion,
        datos.telefono = res.rows.item(0).telefono
      }
      this.vendedores.next(datos as any);
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

  //Obtener reporte
  obtenerReportes(){
    return this.db.executeSql('SELECT * FROM reporte WHERE estado = 2',[]).then(res=>{

    })
  }

  //Reportes de publicación
  reportarPublicacion(idpublicacion:any, tipo:any, descripcion:any){
    return this.db.executeSql('INSERT INTO reporte (tipo, descripcion, idpublicacion) VALUES(?, ? , ?);',[tipo, descripcion, idpublicacion])
    .then(res =>{
      this.db.executeSql('UPDATE publicacion SET estado = 2 WHERE idpublicacion = ?',[idpublicacion])
      this.obtenerReportes();  
    }).catch(e =>{
      this.presentAlert("",'Error al generar el reporte intente nuevamente más tarde' + JSON.stringify(e))
    })
  }

  //Para obtener las publicaciones del usuario logeado
  publicacionUser(id:any){
    return this.db.executeSql('SELECT * FROM publicacion WHERE idusuario = ?',[id]).then(res=>{
      let publiUser: Publicacion[] = [];
      if(res.rows.length > 0){
        for(var i=0; i < res.rows.length; i++){
          publiUser.push({
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
      this.publiUser.next(publiUser as any);
    }).catch(e =>{
      this.presentAlert("","Ha ocurrido un error en la base de datos" + e);
    })
  }

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
      this.presentAlert("","Error en la base de datos (Publicaciones)" + e);
    })
  }

  actualizarEstadoPublicacion(idpublicacion: string, nuevoEstado: number) {
    return this.db.executeSql('UPDATE publicacion SET estado = ? WHERE idpublicacion = ?', [nuevoEstado, idpublicacion]);
  }

  eliminarProducto(idpublicacion: string) {
    return this.db.executeSql('DELETE FROM publicacion WHERE idpublicacion = ?', [idpublicacion])
  }


  
  //Buscador de autos
  buscarAuto(marca: any, modelo:any){
    return this.db.executeSql('SELECT * FROM publicacion WHERE marca = ? OR modelo = ?',[marca, modelo])
    .then((res)=>{
      let publicacion: Publicacion[] = [];
      if(res.rows.length > 0){
        publicacion.push({
          idpublicacion: res.rows.item(0).idpublicacion,
          modelo: res.rows.item(0).modelo,
          marca : res.rows.item(0).marca,
          precio : res.rows.item(0).precio,
          color : res.rows.item(0).color,
          transmision : res.rows.item(0).transmision,
          descripcion : res.rows.item(0).descripcion,
          estado : res.rows.item(0).estado,
          kilometraje : res.rows.item(0).kilometraje,
          cantidaddeuso : res.rows.item(0).cantidaddeuso,
          foto : res.rows.item(0).foto,
          idusuario : res.rows.item(0).idusuario
        })
      }
      this.observer.next(publicacion as any);
    }).catch(e => {
      this.presentAlert("","Error al buscar la publicacion" + e);
    })
  }

  //Añadir nuevos autos
  crearPublicacion(modelo:any, marca:any, precio: any, color:any, transmision:any, descripcion:any, estado:any, kilometraje:any, cantidaddeuso:any, foto:any, idusuario:any){
    return this.db.executeSql('INSERT or IGNORE INTO publicacion(modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (UPPER(?),UPPER(?),?,?,?,?,?,?,?,?,?)',[modelo,marca,precio, color, transmision, descripcion, estado, kilometraje, cantidaddeuso, foto, idusuario])
    .then(() => {
      this.buscarPublicacion();
    }).catch((e) =>{ this.presentAlert("",'error en crear publicacion: ' + JSON.stringify(e))
    })
  }

  //Editar Autos
  editarPublicacion(id:any, modelo: any, marca: any, precio: any, color: any, transmision:any, descripcion:any, estado:any, kilometraje:any, cantidaddeuso:any, foto:any, idusuario:any){
    let publicaciones: any = [{
      idpubli: '',
      modelo: '',
      marca: '',
      precio: '',
      color: '',
      transmision: '',
      descripcion: '',
      estado: '',
      kilometraje: '',
      cantidaddeuso: '',
      foto: '',
      idusuario: ''
    }];
    return this.db.executeSql('UPDATE publicacion SET modelo = ?, marca = ?, precio = ?, color = ?, transmision = ?, descripcion = ?, , estado = ?, kilometraje = ?, cantidaddeuso = ?, foto = ? WHERE idusuario = ? AND idpublicacion;',[modelo, marca, precio, color, transmision, descripcion, estado, kilometraje, cantidaddeuso, foto, idusuario, id])
    .then(() =>{
      this.db.executeSql('select * from publicacion where idusuario = ?;',[idusuario])
      .then((res) => {
        if(res.rows.length > 0){
          publicaciones.idpubli = res.rows.item(0).idpublicacion,
          publicaciones.modelo = res.rows.item(0).modelo,
          publicaciones.marca = res.rows.item(0).marca,
          publicaciones.precio = res.rows.item(0).precio,
          publicaciones.color = res.rows.item(0).color,
          publicaciones.transmision = res.rows.item(0).transmision,
          publicaciones.descripcion = res.rows.item(0).descripcion,
          publicaciones.estado = res.rows.item(0).estado,
          publicaciones.kilometraje = res.rows.item(0).kilometraje,
          publicaciones.cantidaddeuso = res.rows.item(0).cantidaddeuso,
          publicaciones.foto = res.rows.item(0).foto,
          publicaciones.idusuario = res.rows.item(0).idusuario
        }
        this.mispublicaciones.next(publicaciones as any); 
      })
    })
    .catch(e => this.presentAlert("","Error en editar publicaciones" + e));
  }



  //Administrador

}