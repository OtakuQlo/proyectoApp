import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController, IonModal, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-pagina-producto',
  templateUrl: './pagina-producto.page.html',
  styleUrls: ['./pagina-producto.page.scss'],
})
export class PaginaProductoPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  rol: string = '';
  verificador: string = '';
  tipoReporte: number = 0;
  errorLabel: string = '';
  auto1: [string, string, string, string, number, string] = ["Alfa Romeo Giulia", "32.900.000", "Miguel Perez", "Avenida Generica 1234",
    78784471, "La marca italiana regresa al segmento D de los sedanes con esta berlina de corte deportivo y tracción trasera, un vehículo premium muy agresivo y atractivo a la vista, a lo que debemos sumar la presencia de una cabina con estupendos acabados."];

  arrCarac: string[] = ["Rojo", "Alfa Romeo", "Semiautomatica"];

  constructor(private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private toastController: ToastController, private animationCtrl: AnimationController) {
    this.activedRouter.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.rol = this.router.getCurrentNavigation()?.extras.state?.['rol'];
        this.verificador = this.router.getCurrentNavigation()?.extras.state?.['verificador'];
      }
    })
  }

  ngOnInit() {
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
            this.presentToast('bottom', 'Acción cancelada');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminar clicked');
            this.router.navigate(['/pagina-principal']);
            this.presentToast('bottom', 'El elemento ha sido eliminado');
            this.presentToast('bottom', 'El elemento ha sido eliminado');
          },
        },
      ],
    });

    await alert.present();
  }

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
            this.presentToast('bottom', 'Acción cancelada');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Eliminar clicked');
            this.router.navigate(['/pagina-principal']);
            this.presentToast('bottom', 'Acción aceptada');
          },
        },
      ],
    });

    await alert.present();
  }

  mandarReporte() {
    if (this.tipoReporte == 0) {
      this.errorLabel = 'Porfavor escoja una opcion para reportar';
    } else {
      this.errorLabel = '';
      this.router.navigate(['/pagina-principal']);
      let toastMessage = 'El producto ha sido reportado';
      this.presentToast('bottom', toastMessage);
      this.closeModal();
    }
  };

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}