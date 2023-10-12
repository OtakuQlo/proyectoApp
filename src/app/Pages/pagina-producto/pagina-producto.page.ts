import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonModal, MenuController, AlertController } from '@ionic/angular';
import { CallnumberService } from 'src/app/services/callnumber.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-pagina-producto',
  templateUrl: './pagina-producto.page.html',
  styleUrls: ['./pagina-producto.page.scss'],
})
export class PaginaProductoPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  rol: any = localStorage.getItem('rol');
  verificador: string = '';
  tipoReporte: number = 0;
  errorLabel: string = '';
  idpublicacion: string = '';
  modelo: string = '';
  marca: string = '';
  precio!: number;
  color: string = '';
  transmision: string = '';
  descripcion: string = '';
  estado: string = '';
  kilometraje!: number;
  cantidaddeuso!: number;
  foto: any;
  idusuario!: any;

  nombre: any;
  apellido: any;
  direccion: any;
  telefono: any;

  reportes: any;

  datosnuevos: any = [
    {
      rol: '',
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      direccion: '',
    },
  ];

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private menu: MenuController,
    private db: DatabaseService,
    private alertController: AlertController,
    private callNumber: CallnumberService
  ) {
    this.activedRouter.queryParams.subscribe((res) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.idpublicacion =
          this.router.getCurrentNavigation()?.extras?.state?.['idpublicacionE'];
        this.modelo =
          this.router.getCurrentNavigation()?.extras?.state?.['modeloE'];
        this.marca =
          this.router.getCurrentNavigation()?.extras?.state?.['marcaE'];
        this.precio =
          this.router.getCurrentNavigation()?.extras?.state?.['precioE'];
        this.color =
          this.router.getCurrentNavigation()?.extras?.state?.['colorE'];
        this.transmision =
          this.router.getCurrentNavigation()?.extras?.state?.['transmisionE'];
        this.descripcion =
          this.router.getCurrentNavigation()?.extras?.state?.['descripcionE'];
        this.estado =
          this.router.getCurrentNavigation()?.extras?.state?.['estadoE'];
        this.kilometraje =
          this.router.getCurrentNavigation()?.extras?.state?.['kilometrajeE'];
        this.cantidaddeuso =
          this.router.getCurrentNavigation()?.extras?.state?.['cantidaddeusoE'];
        this.foto =
          this.router.getCurrentNavigation()?.extras?.state?.['fotoE'];
        this.idusuario =
          this.router.getCurrentNavigation()?.extras?.state?.['idusuarioE'];
        this.verificador =
          this.router.getCurrentNavigation()?.extras?.state?.['verificador'];
      }
    });
  }

  ngOnInit() {
    this.menu.enable(true);
    this.db.bdState().subscribe((res) => {
      //verifico si el estatus es true
      if (res) {
        //me subscribir al observable de la Tabla
        this.db.fetchVendedores().subscribe((datos) => {
          this.datosnuevos = datos;
          this.nombre = this.datosnuevos.nombre;
          this.telefono = this.datosnuevos.telefono;
          this.direccion = this.datosnuevos.direccion;
          this.apellido = this.datosnuevos.apellido;
        });

        this.db.fetchReporteAuto().subscribe((datosreportes) => {
          this.reportes = datosreportes;
        });
      }
    });
  }

  reportarAuto() {
    let navigationExtras: NavigationExtras = {
      state: {
        publicacion: this.idpublicacion,
      },
    };
    this.router.navigate(['/reportar-auto'], navigationExtras);
  }

  async presentAcceptRejectConfirmation(action: string) {
    const header = 'Confirmación';
    const message =
      action === 'aceptar'
        ? '¿Estás seguro de que deseas aceptar esta solicitud?'
        : '¿Estás seguro de que deseas rechazar esta solicitud?';

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: action === 'aceptar' ? 'Aceptar' : 'Rechazar',
          handler: async () => {
            if (action === 'aceptar') {
              const idPublicacion = this.idpublicacion;
              await this.db.actualizarEstadoPublicacion(idPublicacion, 1);
              await this.db.buscarPublicacion();
          
              this.router.navigate(['/pagina-principal']);
              this.db.presentToast('bottom', 'Producto aceptado con exito');
            } else if (action === 'rechazar') {
              const idPublicacion = this.idpublicacion;
              await this.db.actualizarEstadoPublicacion(idPublicacion, 3);
              await this.db.buscarPublicacion();
              this.router.navigate(['/pagina-principal']);
              this.db.presentToast('bottom', 'Producto rechazado con exito');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentDeleteConfirmation() {
    const header = 'Confirmación';
    const message = '¿Estás seguro de que deseas eliminar este producto?';

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            const idPublicacion = this.idpublicacion;
            await this.db.eliminarTodosReportes(idPublicacion);
            await this.db.eliminarProducto(idPublicacion);
            await this.db.buscarPublicacion();
            this.router.navigate(['/pagina-principal']);
            this.db.presentToast('bottom', 'Producto eliminado con éxito');
          },
        },
      ],
    });

    await alert.present();
  }

  async presentDeleteReportConfirmation(idreporte: string) {
    const header = 'Confirmación';
    const message = '¿Estás seguro de que deseas eliminar este reporte?';

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            const idPublicacion = this.idpublicacion;
            await this.db.eliminarReporte(idreporte);
            await this.db.cambiarEstadoPublicacion(idPublicacion);
            await this.db.buscarPublicacion();          
            const remainingReportCount = await this.db.getRemainingReportCount(this.idpublicacion);
            if (remainingReportCount === 0) {
              // Redirige a la página del panel de administrador si no quedan más reportes
              this.router.navigate(['/panel-admin']); // Asegúrate de ajustar la ruta según tu configuración.
            } else {
              await this.db.pasarReportes(this.idpublicacion);
            }
            await this.db.pasarReportes(this.idpublicacion);
            this.db.presentToast('bottom', 'Reporte eliminado con éxito');
          },
        },
      ],
    });

    await alert.present();
  }

  showNumber(telefono: any) {
    this.callNumber.showNumber('+569' + telefono);
  }

  pasarReportes(id: any) {
    this.db.pasarReportes(id);
  }
}
