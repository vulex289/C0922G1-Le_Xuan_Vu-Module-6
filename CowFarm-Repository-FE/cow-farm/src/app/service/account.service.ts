import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private API = 'http://localhost:8080/api/account';
  constructor(private  httpClient: HttpClient) {
  }
  findUserEmail(email: string): Observable<Account> {
    return this.httpClient.get<Account>(`http://localhost:8080/api/account/${email}`);
  }
}
