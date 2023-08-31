import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {

  constructor(private router:Router,private toastController: ToastController) { }
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  telefono: string = '';

   // variables label
   labelNombre: string = '';
   labelApellido: string = '';
   labelCorreo: string = '';
   labelTelefono: string = '';

   //regex
  regexname: RegExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,100}$/;
  regexCorreo: RegExp = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/;
  regexTelefono: RegExp = new RegExp (/^[0-9]{8,8}$/);

   

  ngOnInit() {
  }
  irPaginaPrinicipal(){



    // la bandera si está en verdadero permite que se envien los datos en caso contrario no lo permite
    let bandera = true;

    // validacion nombre
    if(!this.regexname.test(this.nombre)){
      bandera = false;
      this.labelNombre = 'Debe ingresar un nombre valido.';
    }else{
      this.labelNombre = '';
    }

    // validacion apellido
    if(!this.regexname.test(this.apellido)){
      bandera = false;
      this.labelApellido = 'Debe ingresar un apellido valido.';
    }else{
      this.labelApellido = '';
    }
    // validacion correo
    if (!this.regexCorreo.test(this.correo)) {
      bandera = false;
      this.labelCorreo = 'Debe ingresar un correo valido';
    }else{
      this.labelCorreo = '';
    }
    if(!this.regexTelefono.test(this.telefono)){
      bandera = false;
  
      this.labelTelefono = 'El telefono debe ser tener 8 numeros.';
    }else{
      this.labelTelefono = '';
    }

    if(bandera){
    this.router.navigate(['/perfil']);
    this.presentToast('bottom');
    }

  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Datos cambiados exitosamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
