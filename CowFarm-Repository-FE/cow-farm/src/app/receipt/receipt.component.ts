import {Component, OnInit} from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments';
import {TokenStorageService} from '../service/token-storage.service';
import {AccountService} from '../service/account.service';
import {Account} from '../model/account';
import {SearchService} from '../service/search.service';
import {ICartDetailDto} from '../dto/icart-detail-dto';
import {ProductService} from '../service/product.service';
import Swal from 'sweetalert2';

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

  constructor(private tokenStorageService: TokenStorageService,
              private accountService: AccountService,
              private searchService: SearchService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getUser();
    this.renderPayPalBtn();
    this.searchService.getTotal().subscribe(item => {
      this.total = item;
    });
  }

  renderPayPalBtn() {
    document.getElementById('paypalBtn').innerHTML = '<div id="paypalButtons" style="margin-left: 300px"></div>';
    render(
      {
        id: '#paypalButtons',
        value: this.total.toString(),
        currency: 'USD',
        onApprove: (details) => {
          Swal.fire({
            title: 'Thông báo!',
            text: 'Payment success!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }

  getTotal() {
    for (const element of this.cartDetailDtos) {
      this.sum += element.quantity * element.price;
    }
    this.total = this.sum + this.shippingPay;
    this.searchService.setTotal(this.total);
  }

  findAllCartDetailByAccountId(accountId: number) {
    this.productService.findAllCartDetailByAccountId(accountId).subscribe(item => {
      this.cartDetailDtos = item;
      if (this.sum === 0) {
        this.getTotal();
      }
    });
  }

  getUser() {
    this.username = this.tokenStorageService.getUser()?.username;
    this.accountService.findUserEmail(this.username).subscribe(next => {
      this.user = next;
      this.findAllCartDetailByAccountId(next.accountId);
    });
  }
}
