import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDormDetailPageRoutingModule } from './view-dorm-detail-routing.module';

import { ViewDormDetailPage } from './view-dorm-detail.page';
import { StarRatingModule } from 'ionic5-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDormDetailPageRoutingModule,
    StarRatingModule
  ],
  declarations: [ViewDormDetailPage]
})
export class ViewDormDetailPageModule {}
