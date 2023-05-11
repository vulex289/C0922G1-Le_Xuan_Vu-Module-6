import {Component, OnInit} from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments';
import {TokenStorageService} from '../service/token-storage.service';
import {AccountService} from '../service/account.service';
import {Account} from '../model/account';
import {SearchService} from '../service/search.service';
import {ICartDetailDto} from '../dto/icart-detail-dto';
import {ProductService} from '../service/product.service';
import Swal from 'sweetalert2';
import {CartDetailService} from '../service/cart-detail.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  username = '';
  user: Account;
  total = 0;
  cartDetailDtos: ICartDetailDto[];
  sum = 0;
  shippingPay = 5;
  flag = true;

  constructor(private tokenStorageService: TokenStorageService,
              private accountService: AccountService,
              private searchService: SearchService,
              private productService: ProductService,
              private cartDetailService: CartDetailService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser()?.username;
    this.accountService.findUserEmail(this.username).subscribe(next => {
      this.user = next;
      this.productService.findAllCartDetailByAccountId(this.user?.accountId).subscribe(item => {
        this.cartDetailDtos = item;
        console.log(this.cartDetailDtos);
        if (this.sum === 0) {
          this.getTotal();
        }
        this.renderPayPalBtn();
      });
    });

    this.searchService.getTotal().subscribe(item => {
      this.total = item;
    });
  }

  renderPayPalBtn() {
    document.getElementById('paypalBtn').innerHTML = '<div id="paypalButtons" style="margin-left: 300px"></div>';
    render(
      {
        id: '#paypalButtons',
        value: String(this.total),
        currency: 'USD',
        onApprove: (details) => {
          if (this.flag === true) {
            this.cartDetailService.deleteAllDetailByAccountId(this.user.accountId).subscribe(() => {
              this.searchService.setCount(0);
              this.cartDetailService.addNewPurchaseHistoryByAccountIdAndCartDetailId(this.user.accountId, this.total).subscribe(() => {
              });
            });
            for (const item of this.cartDetailDtos) {
              this.productService.setInventoryByProduct(item.inventoryLevel - item.quantity, item.productId).subscribe(() => {
              });
            }
            Swal.fire({
              title: 'Notification!',
              text: 'Payment success!',
              icon: 'success',
              confirmButtonColor: 'darkgreen',
              confirmButtonText: 'OK'
            });
            this.route.navigateByUrl('/product');
          }
        }
      });
  }

  getTotal() {
    for (const element of this.cartDetailDtos) {
      this.sum += element.quantity * element.price;
    }
    this.total = this.sum + this.shippingPay;
    console.log(this.total);
    this.searchService.setTotal(this.total);
  }

  // findAllCartDetailByAccountId(accountId: number) {
  //   this.productService.findAllCartDetailByAccountId(accountId).subscribe(item => {
  //     this.cartDetailDtos = item;
  //     this.getTotal();
  //   });
  //
  // }

  // getUser() {
  //   this.username = this.tokenStorageService.getUser()?.username;
  //   this.accountService.findUserEmail(this.username).subscribe(next => {
  //     this.user = next;
  //     this.findAllCartDetailByAccountId(next.accountId);
  //   });
  // }
}
