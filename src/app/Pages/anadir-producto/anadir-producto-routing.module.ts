import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirProductoPage } from './anadir-producto.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirProductoPageRoutingModule {}
