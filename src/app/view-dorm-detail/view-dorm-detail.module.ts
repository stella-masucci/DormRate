import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDormDetailPageRoutingModule } from './view-dorm-detail-routing.module';

import { ViewDormDetailPage } from './view-dorm-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDormDetailPageRoutingModule
  ],
  declarations: [ViewDormDetailPage]
})
export class ViewDormDetailPageModule {}
