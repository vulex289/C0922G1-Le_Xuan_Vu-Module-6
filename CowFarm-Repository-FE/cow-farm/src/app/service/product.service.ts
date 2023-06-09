import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {interval, Observable} from 'rxjs';
import {Product} from '../model/product';
import {CartDetail} from '../model/cart-detail';
import {ICartDetailDto} from '../dto/icart-detail-dto';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8080/api/product/list');
  }

  findAllByName(nameSearch: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8080/api/product?nameSearch=' + nameSearch);
  }

  findProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>('http://localhost:8080/api/product-detail/' + productId);
  }

  saveCartDetailByUserIdAndProductId(accountId: number, productId: number, quantity: number): Observable<CartDetail> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<CartDetail>('http://localhost:8080/api/cart/product-detail/addCart/' + productId + '/' + accountId + '/' + quantity);
  }

  findAllCartDetailByAccountId(accountId: number): Observable<ICartDetailDto[]> {
    return this.httpClient.get<ICartDetailDto[]>('http://localhost:8080/api/cart/' + accountId);
  }

  deleteProductByProductIdAndCartId(cartId: number, productId: number): Observable<any> {
    return this.httpClient.delete<any>('http://localhost:8080/api/cart/cart-detail/' + cartId + '/' + productId);
  }

  setInventoryByProduct(inventoryLevel: number, productId: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/product-inventory-level/' + inventoryLevel + '/' + productId);
  }

  getData(accountId: number): Observable<any> {
    return interval(5000) // Truy vấn định kỳ sau mỗi 5 giây
      .pipe(switchMap(() => this.httpClient.get<any>('http://localhost:8080/api/cart/' + accountId)));
  }
}
