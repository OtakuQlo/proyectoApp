import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController, AnimationController, IonCard, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.page.html',
  styleUrls: ['./pagina-principal.page.scss'],
})
export class PaginaPrincipalPage implements OnInit {
  /*
  @ViewChild('modal', { static: true }) modal!: IonModal;
  */
  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;
  busqueda: string = "";


  //dsps cambiar esto cuando se conecte a la base de datos
  auto1: [string, number, string, string, number, string] = ["Alfa Romeo Giulia", 32900000, "Miguel Perez", "Avenida Generica 1234",
    78784471, "La marca italiana regresa al segmento D de los sedanes con esta berlina de corte deportivo y tracción trasera, un vehículo premium muy agresivo y atractivo a la vista, a lo que debemos sumar la presencia de una cabina con estupendos acabados."];
  auto2: [string, number, string, string, number, string] = ["Audi A3 Sedán", 34490000, "Manuel Rivera", "Avenida Generica 1234", 78784471, "AAA"];

  autoModelo: any = [
    {
      nombre: "Alfa Romeo Giulia", precio: 32900000,
      nombreVendedor: "Miguel Perez", direccion: "Avenida Generica 1234",
      numeroContacto: 78784471,
      descripcion: "La marca italiana regresa al segmento D de los sedanes con esta berlina de corte deportivo y tracción trasera, un vehículo premium muy agresivo y atractivo a la vista, a lo que debemos sumar la presencia de una cabina con estupendos acabados."
    },

    {
      nombre: "Audi A3 Sedán", precio: 34490000,
      nombreVendedor: "Manuel Rivera", direccion: "Avenida Generica 1234",
      numeroContacto: 78784471,
      descripcion: "AAA"
    }
  ];

  /*
  rol: string = '';
  verificador: string = '';
  */

  autos = [this.autoModelo];
  cardC: any;

  constructor(private animationCtrl: AnimationController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController) {
    /*this.activedRouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.rol = this.router.getCurrentNavigation()?.extras.state?.['rol'];
        this.verificador = this.router.getCurrentNavigation()?.extras.state?.['verificador'];
      }
    })
    */
  }

  ngOnInit() {
    /* 
      const enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(root!.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(root!.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: HTMLElement) => {
      return enterAnimation(baseEl).direction('reverse');
    };

    this.modal.enterAnimation = enterAnimation;
    this.modal.leaveAnimation = leaveAnimation;
  }

  closeModal() {
    this.modal.dismiss();
  }

  irReportar() {
    this.router.navigate(['/reportar-auto']);
  };

  async presentSolicitudAlert(action: string) {
    const message =
      action === 'aceptar'
        ? '¿Estás seguro de que deseas aceptar esta solicitud?'
        : '¿Estás seguro de que deseas rechazar esta solicitud?';

    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Eliminar clicked');
            this.router.navigate(['/pagina-principal']);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentConfirmationAlert(action: string) {
    const message =
      action === 'producto'
        ? '¿Estás seguro de que deseas eliminar este producto?'
        : '¿Estás seguro de que deseas eliminar este reporte?';

    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminar clicked');
            this.router.navigate(['/pagina-principal']);
          },
        },
      ],
    });

    await alert.present();
  */
  }



  play() {
    this.router.navigate(['/pagina-producto'])
  }

}


