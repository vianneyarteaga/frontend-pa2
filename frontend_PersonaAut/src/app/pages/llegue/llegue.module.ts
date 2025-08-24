import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LleguePageRoutingModule } from './llegue-routing.module';

import { LleguePage } from './llegue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LleguePageRoutingModule
  ],
  declarations: [LleguePage]
})
export class LleguePageModule {}
