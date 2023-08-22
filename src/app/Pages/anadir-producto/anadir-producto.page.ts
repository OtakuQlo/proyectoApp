import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-anadir-producto',
  templateUrl: './anadir-producto.page.html',
  styleUrls: ['./anadir-producto.page.scss'],
})
export class AnadirProductoPage implements OnInit {

  constructor() { }
  nombreV: string = "";
  precioV: number = 0;
  colorV: string ="";
  marcaV: string ="";
  anosV: number= 0;
  descrpV: string = "";
  kilometrajeV: number = 0; 
  ngOnInit() {
  }

}
