import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReviewDetailPageRoutingModule } from './view-review-detail-routing.module';

import { ViewReviewDetailPage } from './view-review-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReviewDetailPageRoutingModule
  ],
  declarations: [ViewReviewDetailPage]
})
export class ViewReviewDetailPageModule {}
