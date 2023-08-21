import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarcontraPageRoutingModule } from './ingresarcontra-routing.module';

import { IngresarcontraPage } from './ingresarcontra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarcontraPageRoutingModule
  ],
  declarations: [IngresarcontraPage]
})
export class IngresarcontraPageModule {}
