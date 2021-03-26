import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account.component';
import {ProfileComponent} from './components/profile/profile.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {ReactiveFormsModule} from '@angular/forms';


const routes: Routes = [
  {path: '', component: AccountComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'wishlist', component: WishlistComponent},
];

@NgModule({
  declarations: [AccountComponent, ProfileComponent, WishlistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AccountModule {
}
