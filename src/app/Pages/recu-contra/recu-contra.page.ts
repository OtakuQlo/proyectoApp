import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-recu-contra',
  templateUrl: './recu-contra.page.html',
  styleUrls: ['./recu-contra.page.scss'],
})
export class RecuContraPage implements OnInit {
  rut: any;
  input = '';
  constructor(
    private alertController: AlertController,
    private router: Router,
    private menu: MenuController,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.menu.enable(false);
  }

  irRecuPregunta() {
    this.db.irRecuperarPregunta(this.input);
    
  }
}
