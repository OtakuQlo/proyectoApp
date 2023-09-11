import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db!:SQLiteObject;
  
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