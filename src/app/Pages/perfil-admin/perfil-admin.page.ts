import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.page.html',
  styleUrls: ['./perfil-admin.page.scss'],
})
export class PerfilAdminPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irModificarPerfilAdmin(){
    this.router.navigate(['/modificar-perfil-admin']);

  }

  irPanelAdmin(){
    this.router.navigate(['/panel-admin']);

  }

}
