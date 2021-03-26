import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './components/auth/guards/auth.guard';
import {RoleGuardService as RoleGuard} from './services';
import {AccountComponent} from './components/account/account.component';

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
    loadChildren: () => import('./components/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [RoleGuard, AuthGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'account',
    loadChildren: () => import('./components/account/account.module').then((m) => m.AccountModule),
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
