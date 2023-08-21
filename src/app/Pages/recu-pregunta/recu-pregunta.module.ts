import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuPreguntaPageRoutingModule } from './recu-pregunta-routing.module';

import { RecuPreguntaPage } from './recu-pregunta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuPreguntaPageRoutingModule
  ],
  declarations: [RecuPreguntaPage]
})
export class RecuPreguntaPageModule {}
