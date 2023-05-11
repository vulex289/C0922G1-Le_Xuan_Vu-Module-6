import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product';
import {ViewportScroller} from '@angular/common';
import {TokenStorageService} from '../service/token-storage.service';
import {AccountService} from '../service/account.service';
import Swal from 'sweetalert2';
import {SearchService} from '../service/search.service';
import {Router} from '@angular/router';

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
              private accountService: AccountService,
              private searchService: SearchService,
              private route: Router) {

  }

  ngOnInit(): void {
    this.getUser();
    if (this.nameSearch === undefined) {
      this.nameSearch = '';
    }
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
    this.username = this.tokenStorageService.getUser()?.username;
    this.accountService.findUserEmail(this.username).subscribe(next => {
      this.accountId = next?.accountId;
    });
  }

  addCart(productId: number) {
    if (!this.tokenStorageService.getToken()) {
      this.showMessageError('You need login in web');
      this.route.navigateByUrl('/login');
    } else {
      this.productId = productId;
      this.productService.saveCartDetailByUserIdAndProductId(this.accountId, this.productId, 1).subscribe(() => {
        this.showMessageSuccess();
        this.productService.findAllCartDetailByAccountId(this.accountId).subscribe(item => {
          this.searchService.setCount(item.length);
        });
      }, error => {
        if (error.status === 404) {
          Swal.fire({
            title: 'Notification!',
            text: 'You have entered an excess amount of inventory - The number of goods in stock ',
            icon: 'error',
            confirmButtonColor: 'darkgreen',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }

  showMessageSuccess() {
    Swal.fire({
      title: 'Notification!',
      text: 'New cart successfully added ',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  showMessageError(message: string) {
    Swal.fire({
      title: 'Notification!',
      text: message,
      icon: 'success',
      confirmButtonColor: 'darkgreen',
      confirmButtonText: 'OK'
    });
  }
}
