import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {TokenStorageService} from '../service/token-storage.service';
import {AccountService} from '../service/account.service';
import Swal from 'sweetalert2';
import {ViewportScroller} from '@angular/common';
import {ICartDetailDto} from '../dto/icart-detail-dto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  num = 1;
  price: number;
  total: number;
  username: string;
  accountId: number;
  cartDetailDtos: ICartDetailDto[];

  constructor(private productService: ProductService,
              private tokenStorageService: TokenStorageService,
              private accountService: AccountService,
              private viewportScroller: ViewportScroller) {
  }

  ngOnInit(): void {
    this.getUser();

  }

  minus() {
    if (this.num <= 1) {
      this.num = 1;
    } else {
      this.num--;
    }
    this.total = this.num * this.price;
  }

  plus() {
    this.num++;
    this.total = this.num * this.price;
  }

  onHead() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  getUser() {
    this.username = this.tokenStorageService.getUser().username;
    this.accountService.findUserEmail(this.username).subscribe(next => {
      this.accountId = next.accountId;
      this.findAllCartDetailByAccountId(this.accountId);
    });
  }

  // addCart(productId: number) {
  //   this.productId = productId;
  //   this.productService.saveCartDetailByUserIdAndProductId(this.accountId, this.productId, 1).subscribe(() => {
  //     this.showMessageSuccess('Thành công');
  //   }, error => {
  //     this.showMessageError('');
  //   });
  // }

  showMessageSuccess(message: string) {
    Swal.fire({
      title: 'Thông báo!',
      text: 'Thêm mới giỏ hàng ' + message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  showMessageError(message: string) {
    Swal.fire({
      title: 'Thông báo!',
      text: 'Sản phẩm đã được thêm vào giỏ hàng ' + message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  findAllCartDetailByAccountId(accountId: number) {
    this.productService.findAllCartDetailByAccountId(accountId).subscribe(item => {
      this.cartDetailDtos = item;
    });
  }
}
