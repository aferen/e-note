import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveComponent } from './reactive/reactive.component';
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { AuthGuard } from './helpers';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'editor', component: ReactiveComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
// , runGuardsAndResolvers: 'always'
@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true, initialNavigation: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingRoutingModule { }
// ,{ onSameUrlNavigation: 'reload' }
