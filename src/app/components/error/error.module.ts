import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorComponent} from './components/error/error.component';
import {RouterModule, Routes} from '@angular/router';
import {NotAuthComponent} from './components/not-auth/not-auth.component';


const routes: Routes = [
  {path: '', component: ErrorComponent},
  {path: 'not/auth', component: NotAuthComponent},
];

@NgModule({
  declarations: [ErrorComponent, NotAuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ErrorModule {
}
