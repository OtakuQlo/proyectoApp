import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportar-auto',
  templateUrl: './reportar-auto.page.html',
  styleUrls: ['./reportar-auto.page.scss'],
})
export class ReportarAutoPage implements OnInit {

  tipoReporte: string= '';

  constructor() { }

  ngOnInit() {
  }

}
