import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import NotFoundPageComponent from './not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'firmware',
        loadChildren: () => import('../firmware-upload/firmware-upload.module')
          .then(module => module.default),
      },
      {
        path: 'login',
        loadChildren: () => import('../auth/auth.module')
          .then(module => module.default),
      },
      {
        path: 'register',
        loadChildren: () => import('../registration/registration.module')
          .then(module => module.default),
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module')
          .then(module => module.default),
      },
      {
        path: 'test',
        loadChildren: () => import('../test-device/test-device.module')
          .then(module => module.default),
      },
    ],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
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
export default class AppRoutingModule {}