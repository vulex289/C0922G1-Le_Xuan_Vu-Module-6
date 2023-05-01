import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../service/token-storage.service';
import {AccountService} from '../service/account.service';
import {ViewportScroller} from '@angular/common';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private tokenStorageService: TokenStorageService,
              private accountService: AccountService,
              private viewportScroller: ViewportScroller) {
  }

  productId: number;
  productDetail: Product;
  num = 1;
  price: number;
  total: number;
  username: string;
  accountId: number;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.productId = +paramMap.get('productId');
      this.findProductById(this.productId);
    });
    this.getUser();
  }

  findProductById(productId: number) {
    this.productService.findProductById(productId).subscribe(item => {
      this.productDetail = item;
      this.price = item.price;
      this.total = this.price;
    });
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
    });
  }

  addCart(productId: number) {
    this.productId = productId;
    this.productService.saveCartDetailByUserIdAndProductId(this.accountId, this.productId, this.num).subscribe(() => {
      this.showMessageSuccess('Thành công');
    }, error => {
      this.showMessageError('');
    });
  }

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
}
