import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPerfilPageRoutingModule } from './modificar-perfil-routing.module';

import { ModificarPerfilPage } from './modificar-perfil.page';
import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarPerfilPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarPerfilPage]
})
export class ModificarPerfilPageModule {}
