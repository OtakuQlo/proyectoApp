export class Usuario {
    tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (Id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(255) NOT NULL, apellido VARCHAR(255) NOT NULL, correo VARCHAR(255) NOT NULL, clave VARCHAR(255) NOT NULL, respuesta VARCHAR(255) NOT NULL, telefono VARCHAR(255) NOT NULL, foto VARCHAR(255), Id_pregunta INTEGER NOT NULL, Id_rol INTEGER NOT NULL, FOREIGN KEY (Id_pregunta) REFERENCES pregunta(Id_pregunta), FOREIGN KEY (Id_rol) REFERENCES rol(Id_rol));";

    Id_usuario = "";
    nombre = "";
    apellido = "";
    correo = "";
    clave = "";
    respuesta = "";
    telefono = "";
    foto = "";
    Id_pregunta = "";
    
}
