import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './login/login.component';
import {ProductComponent} from './product/product.component';
import {ErrorComponent} from './error/error.component';
import {DetailComponent} from './detail/detail.component';
import {CartComponent} from './cart/cart.component';
import {UserGuard} from './security/user.guard';
import {AuthGuard} from './security/auth.guard';
import {ReceiptComponent} from './receipt/receipt.component';
import {PurchaseHistoryComponent} from './purchase-history/purchase-history.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},

  {
    canActivate: [AuthGuard],
    path: 'login', component: LoginComponent
  },
  {
    path: 'product', component: ProductComponent
  },
  {path: 'error', component: ErrorComponent},
  {
    path: 'product-detail/:productId',
    component: DetailComponent
  },
  {
    canActivate: [UserGuard],
    path: 'cart',
    component: CartComponent
  },
  {
    canActivate: [UserGuard],
    path: 'receipt',
    component: ReceiptComponent
  },
  {
    canActivate: [UserGuard],
    path: 'purchaseHistory',
    component: PurchaseHistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
