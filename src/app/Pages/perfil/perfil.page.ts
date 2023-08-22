import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {
    }

  
    nombre: string =  "Miguel";
    apellido: string = "Pérez";
  


  irModificarPerfil(){
    this.router.navigate(['/modificar-perfil']);

  }

}
