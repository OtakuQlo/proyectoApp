import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirProductoPageRoutingModule } from './anadir-producto-routing.module';

import { AnadirProductoPage } from './anadir-producto.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentsModule } from 'src/app/Components/components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AnadirProductoPageRoutingModule,
    MatFormFieldModule, 
    MatSelectModule
  ],
  declarations: [AnadirProductoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AnadirProductoPageModule {}
