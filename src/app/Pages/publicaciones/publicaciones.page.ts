import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {

  auto1 : [string,number,string,string,number,string] = ["Alfa Romeo Giulia", 32900000,"Miguel Perez","Avenida Generica 1234",
  78784471,"La marca italiana regresa al segmento D de los sedanes con esta berlina de corte deportivo y tracción trasera, un vehículo premium muy agresivo y atractivo a la vista, a lo que debemos sumar la presencia de una cabina con estupendos acabados."];
  
  constructor(private router:Router) { }

  ngOnInit() {
  }

  irModificarAuto(){
    let navigationExtra : NavigationExtras = {
      state: {
        auto : this.auto1
      }
    }
    this.router.navigate(['/modificar-producto'], navigationExtra);

  }
}
