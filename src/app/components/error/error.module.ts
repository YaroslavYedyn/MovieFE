import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorComponent} from './components/error/error.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '', component: ErrorComponent},
  {path: 'not-found', component: NotFoundComponent}
];

@NgModule({
  declarations: [ErrorComponent, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ErrorModule {
}
