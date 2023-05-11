import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {CartDetailService} from '../service/cart-detail.service';
import {AccountService} from '../service/account.service';
import {TokenStorageService} from '../service/token-storage.service';
import {PurchaseHistory} from '../model/purchase-history';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller,
              private cartDetailService: CartDetailService,
              private accountService: AccountService,
              private tokenStorageService: TokenStorageService) {
  }

  username = '';
  purchaseHistories: PurchaseHistory[];

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser().username;
    this.accountService.findUserEmail(this.username).subscribe(next => {
      this.cartDetailService.findAllPurchaseHistoryByAccountId(next.accountId).subscribe(data => {
        this.purchaseHistories = data;
      });
    });
  }

  onHead() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
