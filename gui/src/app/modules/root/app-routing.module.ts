import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from '../core/components/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/ayab', pathMatch: 'full' },
  {
    path: 'ayab',
    loadChildren: () =>
      import('../core/core.module').then((m) => m.CoreModule),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not found' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}