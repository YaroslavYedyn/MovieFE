import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './components/auth/auth.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {CheckComponent} from './components/check/check.component';
import {ActivateComponent} from './components/activate/activate.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';


const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'login', component: LoginComponent},
  {path: 'check', component: CheckComponent},
  {path: 'activate', component: ActivateComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'forgot', component: ChangePasswordComponent},
];

@NgModule({
  declarations: [AuthComponent, LoginComponent, CheckComponent, ActivateComponent, ForgotPasswordComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
