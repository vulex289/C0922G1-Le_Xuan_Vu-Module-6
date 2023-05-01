import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './login/login.component';
import {ProductComponent} from './product/product.component';
import {AdminGuard} from './security/admin.guard';
import {ErrorComponent} from './error/error.component';
import {DetailComponent} from './detail/detail.component';
import {CartComponent} from './cart/cart.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'product', component: ProductComponent
  },
  {path: 'error', component: ErrorComponent},
  {path: 'product-detail/:productId',
  component: DetailComponent
  },
  {canActivate: [],
    path: 'cart',
  component: CartComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
