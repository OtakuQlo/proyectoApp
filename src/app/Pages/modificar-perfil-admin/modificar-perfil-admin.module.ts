import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPerfilAdminPageRoutingModule } from './modificar-perfil-admin-routing.module';

import { ModificarPerfilAdminPage } from './modificar-perfil-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarPerfilAdminPageRoutingModule
  ],
  declarations: [ModificarPerfilAdminPage]
})
export class ModificarPerfilAdminPageModule {}
