import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarProductoPageRoutingModule } from './modificar-producto-routing.module';

import { ModificarProductoPage } from './modificar-producto.page';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ModificarProductoPageRoutingModule
  ],
  declarations: [ModificarProductoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModificarProductoPageModule {}
