import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarPerfilAdminPage } from './modificar-perfil-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarPerfilAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarPerfilAdminPageRoutingModule {}
