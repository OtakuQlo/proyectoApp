import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { MenuController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private router: Router,
    private menu: MenuController,
    private db: DatabaseService
  ) {}
  rut: string = '';
  pass: string = '';

  ngOnInit() {
    this.menu.enable(false);
  }

  ionViewWillEnter() {
    this.rut = '';
    this.pass = '';
    localStorage.removeItem('rol');
    localStorage.removeItem('idper');
    localStorage.removeItem("nombre");
    this.menu.enable(false);
  }

  ngAfterViewInit() {
    this.menu.enable(false);
  }
  
  irPaginaPrinicipal() {
    this.db.inicioSesion(this.rut, this.pass);
  }

  irRecuContra() {
    this.router.navigate(['/recu-contra']);
  }

  irCrearCuenta() {
    this.db.validarRut();
    this.router.navigate(['/inicio-sesion']);
  }
}
