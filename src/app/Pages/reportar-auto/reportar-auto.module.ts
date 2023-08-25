import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportarAutoPageRoutingModule } from './reportar-auto-routing.module';

import { ReportarAutoPage } from './reportar-auto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportarAutoPageRoutingModule
  ],
  declarations: [ReportarAutoPage]
})
export class ReportarAutoPageModule {}
