import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DormsPage } from './dorms.page';

const routes: Routes = [
  {
    path: '',
    component: DormsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DormsPageRoutingModule {}
