import { Component, OnInit } from '@angular/core';
import { NavigationExtras ,Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

import { MenuController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  
  constructor(private router:Router,private toastController: ToastController,private alertController: AlertController,private menu: MenuController, private db: DatabaseService) {
  }
  rut: string = '';
  pass: string = '';

  ngOnInit() {
    this.menu.enable(false);
    
  }
  ngAfterViewInit(){
    this.menu.enable(false);
    
  }
  irPaginaPrinicipal(){
    this.db.inicioSesion(this.rut, this.pass);     
  }
  irRecuContra(){
    this.router.navigate(['/recu-contra']);
  }

  irCrearCuenta(){
    this.router.navigate(['/inicio-sesion']);
  }
 
}
