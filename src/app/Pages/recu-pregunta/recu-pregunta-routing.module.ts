import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuPreguntaPage } from './recu-pregunta.page';

const routes: Routes = [
  {
    path: '',
    component: RecuPreguntaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuPreguntaPageRoutingModule {}
