import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BookComponent } from './book/book.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'books', component: BookComponent, canActivate:[AuthGuard] },
  { path: 'shopping', component: ShoppingCartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
