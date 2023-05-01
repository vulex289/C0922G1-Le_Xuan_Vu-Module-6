import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {CartDetail} from '../model/cart-detail';
import {ICartDetailDto} from '../dto/icart-detail-dto';

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
    return this.httpClient.get<CartDetail>('http://localhost:8080/api/product-detail/addCart/' + productId + '/' + accountId + '/' + quantity);
  }

  findAllCartDetailByAccountId(accountId: number): Observable<ICartDetailDto[]> {
    return this.httpClient.get<ICartDetailDto[]>('http://localhost:8080/api/cart/' + accountId);
  }
}
