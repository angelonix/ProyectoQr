import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrosClasesPageRoutingModule } from './registros-clases-routing.module';

import { RegistrosClasesPage } from './registros-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrosClasesPageRoutingModule
  ],
  declarations: [RegistrosClasesPage]
})
export class RegistrosClasesPageModule {}
