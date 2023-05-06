import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() {
  }

  itemCount: BehaviorSubject<any> = new BehaviorSubject<number>(0);
  itemTotal: BehaviorSubject<any> = new BehaviorSubject<number>(0);

  getCount(): Observable<any> {
    return this.itemCount.asObservable();
  }

  setCount(count: number): void {
    this.itemCount.next(count);
  }
  getTotal(): Observable<any> {
    return this.itemTotal.asObservable();
  }

  setTotal(total: number): void {
    this.itemTotal.next(total);
  }
}
