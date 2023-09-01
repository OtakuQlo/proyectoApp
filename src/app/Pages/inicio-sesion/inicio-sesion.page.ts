import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { validateRut } from '@fdograph/rut-utilities';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  constructor(private router:Router,private toastController: ToastController, private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(false);
  }
  ngAfterViewInit(){
    this.menu.enable(false);
  }
  // regex
  regexpass: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?^&])[A-Za-z\d@$!#%*^?&]{8,50}$/;
  regexname: RegExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,100}$/;
  regexCorreo: RegExp = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/;
  regexTelefono: RegExp = new RegExp (/^[0-9]{8,8}$/);



  // variables
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  contra : string = '';
  contra2 : string = '';
  correo: string = '';
  telefono: string = '';
  respuesta: string = '';
  pregunta: string = '0';
  direccion:string = '';

  // variables label
  labelNombre: string = '';
  labelApellido: string = '';
  labelRut: string = '';
  labelCorreo: string = '';
  labelPregunta: string = '';
  labelTelefono: string = '';
  labelRespuesta: string = '';
  labelContra: string = '';
  labelContra2: string = '';
  labelDireccion:string = '';
 



  irPaginaPrincipal(){
    // la bandera si está en verdadero permite que se envien los datos en caso contrario no lo permite
    let bandera = true;

    // validacion nombre
    if(!this.regexname.test(this.nombre)){
      bandera = false;
      this.labelNombre = 'El nombre debe ser sin caracteres epeciales ni numeros.';
    }else{
      this.labelNombre = '';
    }

    // validacion apellido
    if(!this.regexname.test(this.apellido)){
      bandera = false;
      this.labelApellido = 'El Apellido debe ser sin caracteres especiales ni numeros.';
    }else{
      this.labelApellido = '';
    }

    // validacion this.rut
    if (!validateRut(this.rut)) {
      bandera = false;
      this.labelRut = 'Debe ingresar un rut sin puntos y con guion';
    }else{
      this.labelRut = '';
    }

    // validacion contraseña
    if(!this.regexpass.test(this.contra)){
      bandera = false;
      this.contra = '';
      this.labelContra = 'Debe ingresar una contraseña con carateres especiales, mayuscula y numero con minimo de 8 y maximo de 50 caracteres';

    }else{
      this.labelContra = '';
    }

    // validacion igualdad de las dos contraseñas
    if(this.contra != this.contra2){
      bandera = false;
      this.contra2 = '';
      this.labelContra2 = 'Deben coincidir las contraseñas';
    }else{
        this.labelContra2 = '';
    }

    // validacion correo
    if (!this.regexCorreo.test(this.correo)) {
      bandera = false;
      this.labelCorreo = 'Debe ingresar un correo valido';
    }else{
      this.labelCorreo = '';
    }
    
    // validacion pregunta
    if(parseInt(this.pregunta) == 0){
      bandera = false;
      this.labelPregunta = 'Debe ingresar una opcion';
    }else{
      this.labelPregunta = '';
      this.pregunta = 'coño';
    }

    // validacion respuesta
    if(this.respuesta.length < 5 || this.respuesta.length > 200){
      bandera = false;
      this.labelRespuesta = 'Debe ingresar una respuesta de minimo 5 caracteres y maximo 200';
    }else{
      this.labelRespuesta = '';
    }

    // validacion telefono
    if(!this.regexTelefono.test(this.telefono)){
      bandera = false;
      this.labelTelefono = 'El telefono debe ser tener 8 numeros.';
    }else{
      this.labelTelefono = '';
    }

    // Validar direccion
    if(this.direccion.length < 5 || this.direccion.length > 200){
      bandera = false;
      this.labelDireccion = 'La dirección debe ser de minimo 5 caracteres y maximo 20';
    }else{
      this.labelDireccion = '';
    }

    if(bandera){
      let navigationExtra: NavigationExtras = {
        state: {
          nombre: this.nombre,
          apellido: this.apellido,
          rut: this.rut,
          correo: this.correo,
          direccion: this.direccion,
          rol: 1
        }
      }
      this.router.navigate(['/perfil'], navigationExtra);
      this.presentToast('bottom');
    }
    

    

  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Cuenta creada exitosamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  
  

}
