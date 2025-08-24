import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LleguePage } from './llegue.page';

const routes: Routes = [
  {
    path: '',
    component: LleguePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LleguePageRoutingModule {}
