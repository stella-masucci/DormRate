import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DormsPage } from './dorms.page';
import { DormsPageRoutingModule } from './dorms-routing.module';
import { StarRatingModule } from 'ionic5-star-rating';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DormsPageRoutingModule,
    StarRatingModule
  ],
  declarations: [DormsPage]
})
export class DormsPageModule {}
