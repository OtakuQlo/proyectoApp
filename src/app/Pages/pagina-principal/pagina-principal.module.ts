import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaPrincipalPageRoutingModule } from './pagina-principal-routing.module';

import { PaginaPrincipalPage } from './pagina-principal.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentsModule } from 'src/app/Components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PaginaPrincipalPageRoutingModule
  ],
  declarations: [PaginaPrincipalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class PaginaPrincipalPageModule {}
