import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-reportar-auto',
  templateUrl: './reportar-auto.page.html',
  styleUrls: ['./reportar-auto.page.scss'],
})
export class ReportarAutoPage implements OnInit {

  tipoReporte: string= '';
  labelReporte: string= '';
  descripcion: string= '';
  idpubli: string= '';

  constructor(private router: Router, private activedRouter: ActivatedRoute,private db: DatabaseService){
    this.activedRouter.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.idpubli = this.router.getCurrentNavigation()?.extras?.state?.['publicacion']
      }
    })
  }

  ngOnInit() {
  }

  reportar(){
    let pass = 0
    if (this.tipoReporte == ""){
      pass = 1
      this.labelReporte = 'Debe seleccionar una opcion para reportar'
    }else{
      this.labelReporte= '';
    }

    if (pass == 0){
      this.db.reportarPublicacion(this.idpubli,this.tipoReporte, this.descripcion);
      this.router.navigate(['/pagina-principal']);
    }
  }
}
