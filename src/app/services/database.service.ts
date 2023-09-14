import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //vriable de conexion a BD
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

  //observable para la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  nombre:string = '';
  apellido:string = '';
  

  constructor(private sqlite: SQLite) { 
    this.createDatabase();
  }

  createDatabase() {
    this.sqlite.create({
      name: 'satiscar.db',
      location: 'default'
    })
    .then(() => {alert('base de datos creada')
      
    })
    .catch(e => console.log(e));
  }

  createTable(){
    try{
    this.db.sqlBatch([
    ['CREATE TABLE IF NOT EXISTS  persona (nombre VARCHAR(50) NOT NULL, apellido VARCHAR(50)) NOT NULL'],
    ]).then(() => alert('tablas creadas'))
    .catch((e) => alert(JSON.stringify(e)))
  }catch(error:any){
    alert(error);
  }
  }

  insertData(){
    try{
      let query = 'insert into persona values(miguel, perez)';
      this.db.executeSql(query,[])
    .then(() => alert('datos ingresados a la tabla'))
    .catch((e) => alert(JSON.stringify(e)))
    }catch(error:any){
      alert(error);
    }
  }

  showData(){
    try{
      this.db.executeSql('SELECT * FROM persona',[])
      .then((result)=> {
        for (let i = 0; i < result.rows.lenght ; i++) {
          this.nombre = result.rows.item(1).nombre,
          this.apellido = result.rows.item(1).apellido
        }
      })
      .catch((e) => JSON.stringify(e))
    }catch(error : any){
      alert(error);
    }
  }
}