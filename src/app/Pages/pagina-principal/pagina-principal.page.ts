import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.page.html',
  styleUrls: ['./pagina-principal.page.scss'],
})
export class PaginaPrincipalPage implements OnInit {
  
  busqueda : string ="";

  //dsps cambiar esto cuando se conecte a la base de datos
  auto1 : [string,number,string,string,number,string] = ["Alfa Romeo Giulia", 32900000,"Miguel Perez","Avenida Generica 1234",
  78784471,"La marca italiana regresa al segmento D de los sedanes con esta berlina de corte deportivo y tracción trasera, un vehículo premium muy agresivo y atractivo a la vista, a lo que debemos sumar la presencia de una cabina con estupendos acabados."];
  auto2 : [string,number,string,string,number,string] = ["Audi A3 Sedán", 34490000, "Manuel Rivera", "Avenida Generica 1234", 78784471, "AAA"];
  
  autoModelo : any = [
    {nombre : "Alfa Romeo Giulia", precio : 32900000,
      nombreVendedor : "Miguel Perez", direccion : "Avenida Generica 1234",
      numeroContacto : 78784471, 
      descripcion : "La marca italiana regresa al segmento D de los sedanes con esta berlina de corte deportivo y tracción trasera, un vehículo premium muy agresivo y atractivo a la vista, a lo que debemos sumar la presencia de una cabina con estupendos acabados."},
      
      {nombre : "Audi A3 Sedán", precio : 34490000,
      nombreVendedor : "Manuel Rivera", direccion : "Avenida Generica 1234",
      numeroContacto : 78784471, 
      descripcion : "AAA"}
    
    ];
    
  constructor(private router:Router) { }

  ngOnInit() {
  }

}
