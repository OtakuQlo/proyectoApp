import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';

import { BehaviorSubject, Observable } from 'rxjs';
import { Publicacion } from './publicacion';
import { Pregunta } from './pregunta';
import { NavigationExtras, Router } from '@angular/router';
import { Reporte } from './reporte';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  //variable de conexion a BD
  public db!: SQLiteObject;

  //variables para la creacion de tablas
  tablaPregunta: string =
    'CREATE TABLE IF NOT EXISTS pregunta (idpregunta INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);';
  tablaRol: string =
    'CREATE TABLE IF NOT EXISTS rol (idrol INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL);';
  tablaUsuario: string =
    'CREATE TABLE IF NOT EXISTS usuario (idusuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL, apellido VARCHAR(255) NOT NULL, rut VARCHAR(12) UNIQUE NOT NULL,  correo VARCHAR(255) NOT NULL, clave VARCHAR(255) NOT NULL, respuesta VARCHAR(255) NOT NULL, telefono VARCHAR(255) NOT NULL, direccion VARCHAR(255) NOT NULL, foto VARCHAR(255), idpregunta INTEGER NOT NULL, idrol INTEGER NOT NULL, FOREIGN KEY (idpregunta) REFERENCES pregunta(idpregunta), FOREIGN KEY (idrol) REFERENCES rol(idrol));';
  tablaPublicacion: string =
    'CREATE TABLE IF NOT EXISTS publicacion (idpublicacion INTEGER PRIMARY KEY AUTOINCREMENT, modelo VARCHAR(255) NOT NULL, marca VARCHAR(255) NOT NULL, precio INTEGER NOT NULL, color VARCHAR(255) NOT NULL, transmision VARCHAR(255) NOT NULL, descripcion VARCHAR(255) NOT NULL, estado INTEGER NOT NULL, kilometraje INTEGER NOT NULL, cantidaddeuso INTEGER NOT NULL, foto VARCHAR(255), idusuario INTEGER NOT NULL, FOREIGN KEY (idusuario) REFERENCES usuario(idusuario));';
  tablaReporte: string =
    'CREATE TABLE IF NOT EXISTS reporte (idreporte INTEGER PRIMARY KEY AUTOINCREMENT, tipo VARCHAR(255) NOT NULL, descripcion VARCHAR(255), idpublicacion INTEGER NOT NULL, FOREIGN KEY (idpublicacion) REFERENCES publicacion(idpublicacion));';

  //variables para los insert iniciales
  registroRol1: string =
    "INSERT or IGNORE INTO rol(idrol,nombre) VALUES (1,'Admin');";
  registroRol2: string =
    "INSERT or IGNORE INTO rol(idrol,nombre) VALUES (2,'Usuario');";

  registroUsuario1: string =
    "INSERT or IGNORE INTO usuario(idusuario,nombre,apellido,rut,correo,clave,respuesta,telefono,direccion,foto,idpregunta,idrol) VALUES (1,'Miguel','Pérez','21294525-0','correoreal@duocuc.cl','!Miguel123','AUTOMATICA','87653452','Casa','./../assets/icon/avatar.png',(SELECT idpregunta from pregunta WHERE idpregunta=1), (SELECT idrol from rol WHERE idrol=2));";
  registroUsuario2: string =
    "INSERT or IGNORE INTO usuario(idusuario,nombre,apellido,rut,correo,clave,respuesta,telefono,direccion,foto,idpregunta,idrol) VALUES (2,'Gabriel','Maneiro','21921084-1','ga.maneiro@duocuc.cl','!Miguel123','AUTOMATICA','96842823','Casa2','./../assets/icon/avatar.png',(SELECT idpregunta from pregunta WHERE idpregunta=2), (SELECT idrol from rol WHERE idrol=1));";
  registroUsuario3: string =
    "INSERT or IGNORE INTO usuario(idusuario,nombre,apellido,rut,correo,clave,respuesta,telefono,direccion,foto,idpregunta,idrol) VALUES (3,'Carlos','Pérez','11111111-1','Carlos1@gmail.com','!Miguel123','AUTOMATICA','53487652','Hogar','',(SELECT idpregunta from pregunta WHERE idpregunta=1), (SELECT idrol from rol WHERE idrol=1));";
  registroUsuario4: string =
    "INSERT or IGNORE INTO usuario(idusuario,nombre,apellido,rut,correo,clave,respuesta,telefono,direccion,foto,idpregunta,idrol) VALUES (4,'Javier','Montez','22222222-2','Ja.Montez@duocuc.cl','!Miguel123','AUTOMATICA','94282369','Hogar2','',(SELECT idpregunta from pregunta WHERE idpregunta=2), (SELECT idrol from rol WHERE idrol=2));";

  registroPublicacion1: string =
    "INSERT or IGNORE INTO publicacion(idpublicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (1,'2023 Silverado 3.0TD High Country Auto DC 4WD','Chevrolet',52000000,'gris','Automatica','asd',1,0,0,'./../assets/img/7pur9u1zp5sxxmmrznulgp7zp.jpg',(SELECT idusuario from usuario WHERE idusuario=1));";
  registroPublicacion2: string =
    "INSERT or IGNORE INTO publicacion(idpublicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (2,'2010 Q5 2.0T FSI STRONIC QUATTRO','Audi',11500000,'blanco','Automatica','asd',1,159567,2,'./../assets/img/8hj82b1bladhqqlkk0mu1gqnm.jpg',(SELECT idusuario from usuario WHERE idusuario=1));";
  registroPublicacion3: string =
    "INSERT or IGNORE INTO publicacion(idpublicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (3,'2009 147 2.0 TS 150 CV Sport Selespeed','Alfa Romeo',10900000,'negro','Automatica','asd',1,90000,3,'./../assets/img/alfa_romeo_147_2005_1735_1.jpg',(SELECT idusuario from usuario WHERE idusuario=1));";
  registroPublicacion4: string =
    "INSERT or IGNORE INTO publicacion(idpublicacion,modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (4,'EVOLTIS TOURING GARDX','Subaru',39490000,'gris','Automatica','asd',1,0,0,'./../assets/img/di20mkpjoaq3p4esgr2kppov1.jpg',(SELECT idusuario from usuario WHERE idusuario=1));";

  registroPregunta1: string =
    "INSERT or IGNORE INTO pregunta(idpregunta,nombre) VALUES (1,'¿Cómo se llamaba tu primera mascota?');";
  registroPregunta2: string =
    "INSERT or IGNORE INTO pregunta(idpregunta,nombre) VALUES (2,'¿Cómo se llama el hospital donde naciste?');";

  //observables de las tablas
  observer = new BehaviorSubject([]);
  usuarios = new BehaviorSubject([]);
  vendedores = new BehaviorSubject([]);
  ruts = new BehaviorSubject([]);
  publiUser = new BehaviorSubject([]);
  preguntas = new BehaviorSubject([]);
  pass = new BehaviorSubject([]);
  datosCambioPass = new BehaviorSubject([]);
  reportes = new BehaviorSubject([]);

  //observable para la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController
  ) {
    this.crearDB();
  }

  bdState() {
    return this.isDBReady.asObservable();
  }

  fetchPublicacion(): Observable<Publicacion[]> {
    return this.observer.asObservable();
  }

  fetchPregunta(): Observable<Pregunta[]> {
    return this.preguntas.asObservable();
  }

  fetchReportes(): Observable<Reporte[]> {
    return this.reportes.asObservable();
  }

  fetchUser(): Observable<any[]> {
    return this.usuarios.asObservable();
  }

  fetchVendedores(): Observable<any[]> {
    return this.vendedores.asObservable();
  }

  fetchRut(): Observable<any[]> {
    return this.ruts.asObservable();
  }

  fetchPubliUser(): Observable<any[]> {
    return this.publiUser.asObservable();
  }
  fetchpass(): Observable<any[]> {
    return this.pass.asObservable();
  }
  fetchDatosPass(): Observable<any[]> {
    return this.datosCambioPass.asObservable();
  }

  crearDB() {
    this.platform.ready().then(() =>
      this.sqlite
        .create({
          name: 'bd.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.db = db;
          this.crearTablas();
        })
        .catch((e) => {
          this.presentAlert('', 'error en la crearDB ' + e);
        })
    );
  }

  async crearTablas() {
    try {
      //creación de tablas
      await this.db.executeSql(this.tablaPregunta, []);
      await this.db.executeSql(this.tablaRol, []);
      await this.db.executeSql(this.tablaUsuario, []);
      await this.db.executeSql(this.tablaReporte, []);
      await this.db.executeSql(this.tablaPublicacion, []);

      /*ejecucion de los insert */
      await this.db.executeSql(this.registroPregunta1, []);
      await this.db.executeSql(this.registroPregunta2, []);
      await this.db.executeSql(this.registroRol1, []);
      await this.db.executeSql(this.registroRol2, []);
      await this.db.executeSql(this.registroUsuario1, []);
      await this.db.executeSql(this.registroUsuario2, []);
      await this.db.executeSql(this.registroUsuario3, []);
      await this.db.executeSql(this.registroUsuario4, []);
      await this.db.executeSql(this.registroPublicacion1, []);
      await this.db.executeSql(this.registroPublicacion2, []);
      await this.db.executeSql(this.registroPublicacion3, []);
      await this.db.executeSql(this.registroPublicacion4, []);
      this.isDBReady.next(true);
      this.pasarPregunta();
    } catch (error) {
      this.presentAlert('error de tablas', 'Error en crear las tablas' + error);
    }
  }

  //Alertas
  async presentAlert(titulo: string, msj: string) {
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

  inicioSesion(rut: any, pass: any) {
    let datos: any = [
      {
        idper: '',
        rol: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        direccion: '',
        foto: '',
      },
    ];

    this.db
      .executeSql('select * from usuario where rut = ?', [rut])
      .then((res) => {
        let pass1: any;

        if (res.rows.length > 0) {
          (datos.idper = res.rows.item(0).idusuario),
            (pass1 = res.rows.item(0).clave),
            (datos.nombre = res.rows.item(0).nombre),
            (datos.rol = res.rows.item(0).idrol),
            (datos.apellido = res.rows.item(0).apellido),
            (datos.correo = res.rows.item(0).correo),
            (datos.telefono = res.rows.item(0).telefono),
            (datos.direccion = res.rows.item(0).direccion),
            (datos.foto = res.rows.item(0).foto);
        } else {
          this.presentAlert(
            'Datos erroneos:',
            'Los datos ingesados son erroneos.'
          );
          return;
        }

        if (pass == pass1) {
          this.router.navigate(['/perfil']);
          this.presentToast('bottom', 'Bienvenido a satiscar');
          this.usuarios.next(datos as any);
        } else {
          this.presentAlert(
            'Datos erroneos:',
            'Los datos ingesados son erroneos.'
          );
        }
      });
  }

  validarRut() {
    let arrruts: any[] = [];
    return this.db.executeSql('select * from usuario', []).then((res) => {
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          arrruts.push(res.rows.item(i).rut);
        }
      }
      this.ruts.next(arrruts as any);
    });
  }

  crearUsuario(
    nombre: any,
    apellido: any,
    rut: any,
    correo: any,
    clave: any,
    respuesta: any,
    telefono: any,
    direccion: any,
    foto: any,
    idpregunta: any,
    idrol: any
  ) {
    return this.db
      .executeSql(
        'INSERT INTO usuario(nombre,apellido,rut,correo,clave,respuesta,telefono,direccion,foto,idpregunta,idrol) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [
          nombre,
          apellido,
          rut,
          correo,
          clave,
          respuesta,
          telefono,
          direccion,
          foto,
          idpregunta,
          idrol,
        ]
      )
      .then(() => {
        this.presentAlert('', 'Se ha ingresado los usuarios de forma correcta');
      })
      .catch((e) => {
        this.presentAlert('', 'error en crear usuario: ' + JSON.stringify(e));
      });
  }

  pasarPerfil(id: any) {
    let navigationExtras: NavigationExtras;
    return this.db
      .executeSql(
        'SELECT nombre, apellido, correo, telefono, direccion, foto FROM usuario where idusuario = ?',
        [id]
      )
      .then((res) => {
        if (res.rows.length > 0) {
          navigationExtras = {
            state: {
              nombre: res.rows.item(0).nombre,
              apellido: res.rows.item(0).apellido,
              correo: res.rows.item(0).correo,
              telefono: res.rows.item(0).telefono,
              direccion: res.rows.item(0).direccion,
              foto: res.rows.item(0).foto,
            },
          };
        }
        this.router.navigate(['/modificar-perfil'], navigationExtras);
      });
  }

  editarPerfil(
    id: any,
    nombre: any,
    apellido: any,
    correo: any,
    telefono: any,
    direccion: any,
    foto: any
  ) {
    let datos: any = [
      {
        idper: '',
        rol: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        direccion: '',
        foto: '',
      },
    ];
    return this.db
      .executeSql(
        'UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, telefono = ?, direccion = ?, foto = ? WHERE idusuario = ?;',
        [nombre, apellido, correo, telefono, direccion, foto, id]
      )
      .then(() => {
        this.db
          .executeSql('select * from usuario where idusuario = ?', [id])
          .then((res) => {
            if (res.rows.length > 0) {
              (datos.idper = res.rows.item(0).idusuario),
                (datos.nombre = res.rows.item(0).nombre),
                (datos.rol = res.rows.item(0).idrol),
                (datos.apellido = res.rows.item(0).apellido),
                (datos.correo = res.rows.item(0).correo),
                (datos.telefono = res.rows.item(0).telefono),
                (datos.direccion = res.rows.item(0).direccion),
                (datos.foto = res.rows.item(0).foto);
            }
            this.usuarios.next(datos as any);
          });
      });
  }

  pasarUsuario(id: any) {
    let datos: any = [
      {
        idper: '',
        rol: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        direccion: '',
      },
    ];
    return this.db
      .executeSql('select * from usuario where idusuario = ?', [id])
      .then((res) => {
        if (res.rows.length > 0) {
          (datos.idper = res.rows.item(0).idusuario),
            (datos.rol = res.rows.item(0).idrol),
            (datos.correo = res.rows.item(0).correo),
            (datos.nombre = res.rows.item(0).nombre),
            (datos.apellido = res.rows.item(0).apellido),
            (datos.direccion = res.rows.item(0).direccion),
            (datos.telefono = res.rows.item(0).telefono);
        }
        this.vendedores.next(datos as any);
      });
  }

  pasarPregunta() {
    return this.db
      .executeSql('SELECT * FROM pregunta', [])
      .then((res) => {
        let pregunta: Pregunta[] = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            pregunta.push({
              idpregunta: res.rows.item(i).idpregunta,
              nombre: res.rows.item(i).nombre,
            });
          }
        }
        this.preguntas.next(pregunta as any);
      })
      .catch((e) => {
        this.presentAlert('', 'Error en pasar pregunta ' + JSON.stringify(e));
      });
  }

  recuperar = new BehaviorSubject([]);
  fetchRecuperar(): Observable<Publicacion[]> {
    return this.recuperar.asObservable();
  }

  irRecuperarPregunta(rut: any) {
    let datos: any = [
      {
        idpregunta: '',
        respuesta: '',
        idper: '',
      },
    ];
    return this.db
      .executeSql('SELECT * FROM usuario WHERE rut = ? AND idrol = 2', [rut])
      .then((res) => {
        if (res.rows.length > 0) {
          (datos.idpregunta = res.rows.item(0).idpregunta),
            (datos.respuesta = res.rows.item(0).respuesta);
          datos.idper = res.rows.item(0).idusuario;
          this.recuperar.next(datos as any);
          this.router.navigate(['/recu-pregunta']);
        } else {
          this.presentAlert(
            'Datos erroneos:',
            'El Rut ingresado no es valido.'
          );
        }
      })
      .catch((e) => {
        this.presentAlert('', 'error pasar datos preguntas y resp');
      });
  }

  pasarDatosPass(id: any) {
    let datos: any = [
      {
        id: '',
      },
    ];
    return this.db
      .executeSql('select * from usuario where idusuario = ?', [id])
      .then((res) => {
        if (res.rows.length > 0) {
          datos.id = res.rows.item(0).idusuario;
        }
        this.datosCambioPass.next(datos as any);
      })
      .catch((e) => JSON.stringify(e));
  }

  habilitarPass(id: any) {
    let datos: any = [
      {
        id: '',
        pass: '',
      },
    ];
    return this.db
      .executeSql('SELECT * FROM usuario WHERE idusuario = ? ', [id])
      .then((res) => {
        if (res.rows.length > 0) {
          (datos.id = res.rows.item(0).idusuario),
            (datos.pass = res.rows.item(0).clave);
        }
        this.pass.next(datos as any);
        this.router.navigate(['/ingresarcontra']);
      })
      .catch((e) => {
        this.presentAlert('', 'error de pasar contra');
      });
  }

  cambiarContra(pass: any, id: any) {
    return this.db
      .executeSql('UPDATE usuario set clave = ? where idusuario = ?', [
        pass,
        id,
      ])
      .then(() => {
        this.presentToast('bottom', 'Contraseña cambiada con exito.');
      })
      .catch((e) => {
        this.presentAlert('', 'error en cambiar contra');
      });
  }

  //Publicaciones

  //Modificar Publicacion
  pasarmodificarPublicacion(idpubli: any) {
    let navigationExtras: NavigationExtras;
    return this.db
      .executeSql('SELECT * FROM publicacion WHERE idpublicacion = ?', [
        idpubli,
      ])
      .then((res) => {
        if (res.rows.length > 0) {
          navigationExtras = {
            state: {
              idpubliE: res.rows.item(0).idpublicacion,
              modeloE: res.rows.item(0).modelo,
              marcaE: res.rows.item(0).marca,
              precioE: res.rows.item(0).precio,
              colorE: res.rows.item(0).color,
              transmisionE: res.rows.item(0).transmision,
              descripcionE: res.rows.item(0).descripcion,
              estadoE: res.rows.item(0).estado,
              kilometrajeE: res.rows.item(0).kilometraje,
              cantidaddeusoE: res.rows.item(0).cantidaddeuso,
              fotoE: res.rows.item(0).foto,
              idusuarioE: res.rows.item(0).idusuario,
            },
          };
        }
        this.router.navigate(['/modificar-producto'], navigationExtras);
      });
  }

  //Obtener reporte
  obtenerReportes() {
    return this.db
      .executeSql('SELECT * FROM publicacion WHERE estado = 2', [])
      .then((res) => {});
  }

  //Reportes de publicación
  reportarPublicacion(idpublicacion: any, tipo: any, descripcion: any) {
    return this.db
      .executeSql(
        'INSERT INTO reporte (tipo, descripcion, idpublicacion) VALUES(?, ? , ?);',
        [tipo, descripcion, idpublicacion]
      )
      .then((res) => {
        this.db.executeSql(
          'UPDATE publicacion SET estado = 2 WHERE idpublicacion = ?;',
          [idpublicacion]
        );
        this.presentToast('bottom', 'La publicación ha sido reportada.');
      })
      .catch((e) => {
        this.presentAlert(
          '',
          'Error al generar el reporte intente nuevamente más tarde' +
            JSON.stringify(e)
        );
      });
  }

  //Para obtener las publicaciones del usuario logeado
  publicacionUser(id: any) {
    return this.db
      .executeSql('SELECT * FROM publicacion WHERE idusuario = ?', [id])
      .then((res) => {
        let publiUser: Publicacion[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            publiUser.push({
              idpublicacion: res.rows.item(i).idpublicacion,
              modelo: res.rows.item(i).modelo,
              marca: res.rows.item(i).marca,
              precio: res.rows.item(i).precio,
              color: res.rows.item(i).color,
              transmision: res.rows.item(i).transmision,
              descripcion: res.rows.item(i).descripcion,
              estado: res.rows.item(i).estado,
              kilometraje: res.rows.item(i).kilometraje,
              cantidaddeuso: res.rows.item(i).cantidaddeuso,
              foto: res.rows.item(i).foto,
              idusuario: res.rows.item(i).idusuario,
            });
          }
        }
        this.publiUser.next(publiUser as any);
      })
      .catch((e) => {
        this.presentAlert('', 'Ha ocurrido un error en la base de datos' + e);
      });
  }

  reportesDatos = new BehaviorSubject([]);
  fetchReporteAuto(): Observable<any[]> {
    return this.reportesDatos.asObservable();
  }

  pasarReportes(id: any) {
    let reportes: any[] = [];
    this.db
      .executeSql('select * from reporte where idpublicacion = ?', [id])
      .then((res) => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            reportes.push({
              idreporte: res.rows.item(i).idreporte,
              tipo: res.rows.item(i).tipo,
              descripcion: res.rows.item(i).descripcion,
              idpublicacion: res.rows.item(i).idpublicacion,
            });
          }
        }
        this.reportesDatos.next(reportes as any);
      })
      .catch((e) => 'error funcion 1');
  }

  eliminarReporte(idreporte: string) {
    return this.db.executeSql('DELETE FROM reporte WHERE idreporte = ?', [
      idreporte,
    ]);
  }

  eliminarTodosReportes(idpublicacion: string) {
    return this.db.executeSql('DELETE FROM reporte WHERE idpublicacion = ?', [
      idpublicacion,
    ]);
  }

  async getRemainingReportCount(idpublicacion: string) {
    try {
      const reportesCount = await this.db.executeSql(
        'SELECT COUNT(*) AS count FROM reporte WHERE idpublicacion = ?',
        [idpublicacion]
      );

      return reportesCount.rows.item(0).count;
    } catch (error) {
      console.error('Error al obtener el número de reportes:', error);
    }
  }

  async cambiarEstadoPublicacion(idpublicacion: string) {
    try {
      // Obtener el número de reportes restantes
      const remainingReportCount = await this.getRemainingReportCount(
        idpublicacion
      );

      if (remainingReportCount === 0) {
        // Si no quedan reportes, actualiza el estado de la publicación a 1
        await this.db.executeSql(
          'UPDATE publicacion SET estado = 1 WHERE idpublicacion = ?',
          [idpublicacion]
        );
        return true; // Estado cambiado con éxito
      } else {
        return false; // La publicación tiene reportes restantes, no se cambió el estado
      }
    } catch (error) {
      console.error('Error al cambiar el estado de la publicación:', error);
      return false; // Error al cambiar el estado
    }
  }

  //Cuando ingresamos a la pagina principal esta funcion permite ver los autos
  buscarPublicacion() {
    return this.db
      .executeSql('SELECT * FROM publicacion', [])
      .then((res) => {
        let publi: Publicacion[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            publi.push({
              idpublicacion: res.rows.item(i).idpublicacion,
              modelo: res.rows.item(i).modelo,
              marca: res.rows.item(i).marca,
              precio: res.rows.item(i).precio,
              color: res.rows.item(i).color,
              transmision: res.rows.item(i).transmision,
              descripcion: res.rows.item(i).descripcion,
              estado: res.rows.item(i).estado,
              kilometraje: res.rows.item(i).kilometraje,
              cantidaddeuso: res.rows.item(i).cantidaddeuso,
              foto: res.rows.item(i).foto,
              idusuario: res.rows.item(i).idusuario,
            });
          }
        }
        this.observer.next(publi as any);
      })
      .catch((e) => {
        this.presentAlert('', 'Error en la base de datos (Publicaciones)' + e);
      });
  }

  actualizarEstadoPublicacion(idpublicacion: string, nuevoEstado: number) {
    return this.db.executeSql(
      'UPDATE publicacion SET estado = ? WHERE idpublicacion = ?',
      [nuevoEstado, idpublicacion]
    );
  }

  eliminarProducto(idpublicacion: string) {
    return this.db.executeSql(
      'DELETE FROM publicacion WHERE idpublicacion = ?',
      [idpublicacion]
    );
  }

  //Añadir nuevos autos
  crearPublicacion(
    modelo: any,
    marca: any,
    precio: any,
    color: any,
    transmision: any,
    descripcion: any,
    estado: any,
    kilometraje: any,
    cantidaddeuso: any,
    foto: any,
    idusuario: any
  ) {
    return this.db
      .executeSql(
        'INSERT or IGNORE INTO publicacion(modelo,marca,precio,color,transmision,descripcion,estado,kilometraje,cantidaddeuso,foto,idusuario) VALUES (UPPER(?),UPPER(?),?,?,?,?,?,?,?,?,?)',
        [
          modelo,
          marca,
          precio,
          color,
          transmision,
          descripcion,
          estado,
          kilometraje,
          cantidaddeuso,
          foto,
          idusuario,
        ]
      )
      .then(() => {
        this.buscarPublicacion();
      })
      .catch((e) => {
        this.presentAlert(
          '',
          'error en crear publicacion: ' + JSON.stringify(e)
        );
      });
  }

  //Editar Autos
  editarPublicacion(
    idpublicacion: any,
    iduser: any,
    modelo: any,
    marca: any,
    precio: any,
    color: any,
    transmision: any,
    descripcion: any,
    estado: any,
    kilometraje: any,
    cantidaddeuso: any,
    foto: any
  ) {
    const nuevoEstado = estado == '3' ? '0' : estado;
    return this.db
      .executeSql(
        'UPDATE publicacion SET modelo = ?, marca = ?, precio = ?, color = ?, transmision = ?, descripcion = ?, estado = ?, kilometraje = ?, cantidaddeuso = ?, foto = ? WHERE idpublicacion = ?;',
        [
          modelo,
          marca,
          precio,
          color,
          transmision,
          descripcion,
          nuevoEstado,
          kilometraje,
          cantidaddeuso,
          foto,
          idpublicacion,
        ]
      )
      .then(() => {
        this.publicacionUser(iduser);
        this.buscarPublicacion();
      })
      .catch((e) => {
        this.presentAlert('', 'error updatear publicacion' + JSON.stringify(e));
      });
  }
}
