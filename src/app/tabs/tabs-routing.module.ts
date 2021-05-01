import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dorms',
        loadChildren: () => import('../dorms/dorms.module').then(m => m.DormsPageModule)
      },
      {
        path: 'add-review',
        loadChildren: () => import('../add-review/add-review.module').then(m => m.AddReviewPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'logout',
        redirectTo: '/sign-in',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'dorms',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
