import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { AppRoutingModule} from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/shared/header/header.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FiltersComponent } from './components/shopping-cart/filters/filters.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { CartItemComponent } from './components/shopping-cart/cart/cart-item/cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    ShoppingCartComponent,
    FiltersComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [AuthService,
  AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent],
  entryComponents:[
    AlertComponent
  ]
})
export class AppModule { }
