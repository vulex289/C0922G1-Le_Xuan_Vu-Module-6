import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product';
import {ViewportScroller} from '@angular/common';
import {TokenStorageService} from '../service/token-storage.service';
import {AccountService} from '../service/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  nameSearch: '';
  productId: number;
  username: string;
  accountId: number;

  constructor(private productService: ProductService,
              private viewportScroller: ViewportScroller,
              private tokenStorageService: TokenStorageService,
              private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.getUser();
    if (this.nameSearch === undefined) {
      this.nameSearch = '';
    }
    console.log('nameSearch' + this.nameSearch);
    this.findAll();
  }

  findAll() {
    this.productService.findAllByName(this.nameSearch).subscribe(next => {
      this.products = next;
    });
  }

  search() {
    this.ngOnInit();
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
    this.productService.saveCartDetailByUserIdAndProductId(this.accountId, this.productId, 1).subscribe(() => {
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
