import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule)},
  {path: 'details/:id', loadChildren: () => import('./components/details/details.module').then((m) => m. DetailsModule)},
  {path: 'error', loadChildren: () => import('./components/error/error.module').then((m) => m.ErrorModule)}
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
