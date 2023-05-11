import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PurchaseHistory} from '../model/purchase-history';

@Injectable({
  providedIn: 'root'
})
export class CartDetailService {

  constructor(private httpClient: HttpClient) {
  }

  updateQuantityOfCartDetailByCartDetailId(quantity: number, cartDetailId: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/cart/cart-detail/updateQuantity/' + cartDetailId + '/' + quantity);
  }

  deleteAllDetailByAccountId(accountId: number): Observable<any> {
    return this.httpClient.delete<any>('http://localhost:8080/api/cart/deleteAll/cart-detail/' + accountId);
  }

  addNewPurchaseHistoryByAccountIdAndCartDetailId(accountId: number, total: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/cart/cart-detail/purchaseHistory/' + accountId + '/' + total);
  }

  findAllPurchaseHistoryByAccountId(accountId: number): Observable<PurchaseHistory[]> {
    return this.httpClient.get<PurchaseHistory[]>('http://localhost:8080/api/cart/cart-detail/purchaseHistory/list/' + accountId);

  }
}
