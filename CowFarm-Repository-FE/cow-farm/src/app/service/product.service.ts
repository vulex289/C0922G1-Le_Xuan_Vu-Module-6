import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';

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
}
