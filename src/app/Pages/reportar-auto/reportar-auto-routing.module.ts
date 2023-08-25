import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportarAutoPage } from './reportar-auto.page';

const routes: Routes = [
  {
    path: '',
    component: ReportarAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportarAutoPageRoutingModule {}
