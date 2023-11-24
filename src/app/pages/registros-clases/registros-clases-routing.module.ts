import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrosClasesPage } from './registros-clases.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrosClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrosClasesPageRoutingModule {}
