import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ItemComponent} from './components/item/item.component';
import {TokenInterceptorService} from './services';
import {MovieSettingComponent} from './components/admin/components/movie-setting/movie-setting.component';
import {EmailSettingComponent} from './components/admin/components/email-setting/email-setting.component';
import {AdminComponent} from './components/admin/admin.component';
import {AccountComponent} from './components/account/account.component';
import {ProfileComponent} from './components/account/components/profile/profile.component';
import {WishlistComponent} from './components/account/components/wishlist/wishlist.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CartoonsComponent} from './components/cartoons/cartoons.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ItemComponent,
    MovieSettingComponent,
    EmailSettingComponent,
    AdminComponent,
    AccountComponent,
    ProfileComponent,
    WishlistComponent,
    CartoonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
