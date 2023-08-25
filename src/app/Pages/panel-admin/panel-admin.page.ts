import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.page.html',
  styleUrls: ['./panel-admin.page.scss'],
})
export class PanelAdminPage implements OnInit {
  rol: string = '';

  userRequests = [
    { productName: 'Solicitud de Producto 1' },
    { productName: 'Solicitud de Producto 2' },
    // ... Más datos de ejemplo
  ];

  userReports = [
    { productName: 'la publicacion es Spam Alfa Romeo Giulia' },
    { productName: 'Reporte de Producto 2' },
    // ... Más datos de ejemplo
  ];

  constructor(private router: Router,private activedRouter: ActivatedRoute) { 
    this.activedRouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.rol = this.router.getCurrentNavigation()?.extras.state?.['rol'];
      }
    })
  }

  ngOnInit() {
  }

  irPaginaProducto(){
    let navigationExtra: NavigationExtras = {
      state: {
      rol: this.rol
      }
    }
    this.router.navigate(['/pagina-producto'],navigationExtra);

  }

  acceptRequest(request: any) {
    // Lógica para aceptar la solicitud y agregar el producto
    // Por ejemplo: Agregar el producto a la lista de productos disponibles
    // y luego eliminar la solicitud de la lista de solicitudes
    // this.userRequests.splice(this.userRequests.indexOf(request), 1);
  }

  rejectRequest(request: any) {
    // Lógica para rechazar la solicitud
    // Por ejemplo: Eliminar la solicitud de la lista de solicitudes
    // this.userRequests.splice(this.userRequests.indexOf(request), 1);
  }

  handleReport(report: any) {
    // Lógica para manejar el reporte
    // Por ejemplo: Tomar acciones basadas en el reporte recibido
    // y luego eliminar el reporte de la lista de reportes
    // this.userReports.splice(this.userReports.indexOf(report), 1);
  }
}
