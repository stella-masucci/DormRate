import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DormsPage } from './dorms.page';

import { DormsPageRoutingModule } from './dorms-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DormsPageRoutingModule
  ],
  declarations: [DormsPage]
})
export class DormsPageModule {}
