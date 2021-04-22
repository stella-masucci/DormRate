import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReviewDetailPage } from './view-review-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReviewDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReviewDetailPageRoutingModule {}
