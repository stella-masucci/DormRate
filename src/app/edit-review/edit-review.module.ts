import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditReviewPageRoutingModule } from './edit-review-routing.module';

import { EditReviewPage } from './edit-review.page';
import { StarRatingModule } from 'ionic5-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditReviewPageRoutingModule,
    StarRatingModule
  ],
  declarations: [EditReviewPage]
})
export class EditReviewPageModule {}
