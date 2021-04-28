import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDormDetailPage } from './view-dorm-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDormDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDormDetailPageRoutingModule {}
