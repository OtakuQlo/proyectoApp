import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaProductoPageRoutingModule } from './pagina-producto-routing.module';

import { PaginaProductoPage } from './pagina-producto.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaProductoPageRoutingModule
  ],
  declarations: [PaginaProductoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaginaProductoPageModule {}
