import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './components/auth/guards/auth.guard';
import {RoleGuardService as RoleGuard} from './services';
import {MovieSettingComponent} from './components/admin/components/movie-setting/movie-setting.component';
import {EmailSettingComponent} from './components/admin/components/email-setting/email-setting.component';
import {AdminComponent} from './components/admin/admin.component';
import {AccountComponent} from './components/account/account.component';
import {ProfileComponent} from './components/account/components/profile/profile.component';
import {WishlistComponent} from './components/account/components/wishlist/wishlist.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule)},
  {
    path: 'details/:id',
    loadChildren: () => import('./components/details/details.module').then((m) => m.DetailsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'movie', component: MovieSettingComponent},
      {path: 'email', component: EmailSettingComponent},
    ],
    canActivate: [RoleGuard, AuthGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'wishlist', component: WishlistComponent}
    ],
    canActivate: [RoleGuard, AuthGuard],
    data: {
      expectedRole: 'user'
    }
  },
  {path: 'error', loadChildren: () => import('./components/error/error.module').then((m) => m.ErrorModule)},
  {path: '**', loadChildren: () => import('./components/not-found/not-found.module').then((m) => m.NotFoundModule)},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
