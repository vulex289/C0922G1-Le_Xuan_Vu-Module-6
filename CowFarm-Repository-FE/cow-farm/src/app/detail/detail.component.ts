import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../service/token-storage.service';
import {AccountService} from '../service/account.service';
import {ViewportScroller} from '@angular/common';
import {SearchService} from '../service/search.service';


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
              private viewportScroller: ViewportScroller,
              private searchService: SearchService,
              private route: Router) {
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
    this.viewportScroller.scrollToPosition([0, 0]);
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
    this.username = this.tokenStorageService.getUser()?.username;
    this.accountService.findUserEmail(this.username).subscribe(next => {
      this.accountId = next?.accountId;
    });
  }

  addCart(productId: number) {
    this.productId = productId;
    this.productService.saveCartDetailByUserIdAndProductId(this.accountId, this.productId, this.num).subscribe(() => {
      this.productService.findAllCartDetailByAccountId(this.accountId).subscribe(item => {
        this.searchService.setCount(item.length);
      });
    }, e => {
      if (!this.tokenStorageService.getToken()) {
        this.showMessageError('You need login in web');
        this.route.navigateByUrl('/login');
      }
      if (e.status === 404) {
        Swal.fire({
          title: 'Notification!',
          text: 'You have entered an excess amount of inventory - The number of goods in stock ',
          icon: 'error',
          confirmButtonColor: 'darkgreen',
          confirmButtonText: 'OK'
        });
      }
    });
    this.route.navigateByUrl('/cart');
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
