import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-pagina-producto',
  templateUrl: './pagina-producto.page.html',
  styleUrls: ['./pagina-producto.page.scss'],
})
export class PaginaProductoPage implements OnInit {
  rol: string = '';

  auto1 : [string,string,string,string,number,string] = ["Alfa Romeo Giulia", "32.900.000","Miguel Perez","Avenida Generica 1234",
  78784471,"La marca italiana regresa al segmento D de los sedanes con esta berlina de corte deportivo y tracción trasera, un vehículo premium muy agresivo y atractivo a la vista, a lo que debemos sumar la presencia de una cabina con estupendos acabados."];
  
  constructor(private router: Router,private activedRouter: ActivatedRoute) { 
    this.activedRouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.rol = this.router.getCurrentNavigation()?.extras.state?.['rol'];
      }
    })
  }

  ngOnInit() {
  }
  
  irReportar(){
    this.router.navigate(['/reportar-auto']);
  };

}
