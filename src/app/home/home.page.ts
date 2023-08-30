import { Component, OnInit } from '@angular/core';
import { NavigationExtras ,Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  constructor(private router:Router,private toastController: ToastController,private alertController: AlertController) {}
  rut: string = '';
  pass: string = '';


  irCrearUsuario(){
    this.router.navigate(['/inicio-sesion']);
  }

  irPaginaPrinicipal(){
    
    
    

    // Cuenta administrador gabo

    if (this.rut == "20966130-6" && this.pass == "!Manuel123"  || this.rut == "21294525-0" && this.pass == "!Miguel123") {
      if (this.rut == "21294525-0" && this.pass == "!Miguel123") {
        let navigationExtra: NavigationExtras = {
          state: {
            nombre: "Miguel",
            apellido: "Pérez",
            rut:'21294525-0',
            correo: "correoreal@duocuc.cl",
            direccion: "Yacare #1185",
            rol: 1,
          }
        }
        this.router.navigate(['/perfil'],navigationExtra);
        this.presentToast('bottom');
      }
      if (this.rut == "20966130-6" && this.pass == "!Manuel123") {
        let navigationExtra: NavigationExtras = {
          state: {
          nombre: "Manuel",
          apellido: "Rivera",
          rut:'20966130-6',
          correo: "correoreal2@duocuc.cl",
          direccion: "Los olmos #1111",
          rol: 2,
  
        }
  
        }
        this.router.navigate(['/perfil'],navigationExtra);
        this.presentToast('bottom');
      }
    }else{

      console.log("waos")
      
    }
    

    

     
  }
  irRecuContra(){
    this.router.navigate(['/recu-contra']);
  }
  irCrearCuenta(){
    this.router.navigate(['/inicio-sesion']);
  }



  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Bienvenido a Satiscar',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Datos erroneos',
      message: 'Los datos ingresados no son validos',
      buttons: ['Confirmar'],
    });

    await alert.present();
  }

}
