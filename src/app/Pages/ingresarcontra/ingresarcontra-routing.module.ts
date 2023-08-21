import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarcontraPage } from './ingresarcontra.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarcontraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarcontraPageRoutingModule {}
