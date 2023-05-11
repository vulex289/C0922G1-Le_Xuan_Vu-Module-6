import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {TokenStorageService} from '../service/token-storage.service';
import {AccountService} from '../service/account.service';
import Swal from 'sweetalert2';
import {ViewportScroller} from '@angular/common';
import {ICartDetailDto} from '../dto/icart-detail-dto';
import {CartDetailService} from '../service/cart-detail.service';
import {SearchService} from '../service/search.service';
import {Router} from '@angular/router';
import {ShareService} from '../service/share.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  sum = 0;
  total = 0;
  username: string;
  accountId: number;
  cartDetailDtos: ICartDetailDto[];
  shippingPay = 5;
  flag = false;

  constructor(private productService: ProductService,
              private tokenStorageService: TokenStorageService,
              private accountService: AccountService,
              private viewportScroller: ViewportScroller,
              private cartDetailService: CartDetailService,
              private searchService: SearchService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser().username;
    this.accountService.findUserEmail(this.username).subscribe(next => {
      this.accountId = next?.accountId;
      this.productService.findAllCartDetailByAccountId(this.accountId).subscribe(item => {
        this.cartDetailDtos = item;
        console.log(this.cartDetailDtos);
        if (this.sum === 0) {
          this.getTotal();
        }
      });
    });

  }

  minus(cartDetailId: number) {
    for (const item of this.cartDetailDtos) {
      if (item.cartDetailId === cartDetailId) {
        if (item.quantity <= 1) {
          break;
        } else {
          item.quantity--;
          this.cartDetailService.updateQuantityOfCartDetailByCartDetailId(item.quantity, cartDetailId).subscribe(() => {
          });
          this.sum -= item.price;
          this.total = this.sum + this.shippingPay;
          this.searchService.setTotal(this.total);
          break;
        }
      }
    }

  }

  plus(cartDetailId: number) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cartDetailDtos.length; i++) {
      if (this.cartDetailDtos[i].cartDetailId === cartDetailId) {
        this.cartDetailDtos[i].quantity++;
        if (this.cartDetailDtos[i].quantity > this.cartDetailDtos[i].inventoryLevel) {
          Swal.fire({
            title: 'Notification!',
            text: 'You have entered an excess amount of inventory - The number of goods in stock ' + this.cartDetailDtos[i].inventoryLevel,
            icon: 'error',
            confirmButtonColor: 'darkgreen',
            confirmButtonText: 'OK'
          });
          this.cartDetailDtos[i].quantity--;
          break;
        } else {
          this.cartDetailService.updateQuantityOfCartDetailByCartDetailId(this.cartDetailDtos[i].quantity, cartDetailId).subscribe(() => {
          }, error => {
          });
          this.sum += this.cartDetailDtos[i].price;
          this.total = this.sum + this.shippingPay;
          this.searchService.setTotal(this.total);
          break;
        }
      }
    }
  }

  onHead() {
    this.viewportScroller.scrollToPosition([0, 0]);
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

  remove(cartDetailId: number, cartId: number, productId: number, productName: string) {
    this.productService.deleteProductByProductIdAndCartId(cartId, productId).subscribe(() => {
        Swal.fire({
          title: 'Notification!',
          text: 'You just dropped the item ' + productName,
          icon: 'success',
          confirmButtonColor: 'darkgreen',
          confirmButtonText: 'OK'
        });
        this.productService.findAllCartDetailByAccountId(this.accountId).subscribe(item => {
          this.searchService.setCount(item.length);
          this.cartDetailDtos = item;
        });
        for (const item of this.cartDetailDtos) {
          if (item.cartDetailId === cartDetailId) {
            this.sum -= item.price * item.quantity;
            this.total = this.sum + this.shippingPay;
            this.searchService.setTotal(this.total);
            break;
          }
        }
      }
    );
  }

  changeQuantity(quantity: number, cartDetailId: number) {
    if (isNaN(quantity)) {
      Swal.fire({
        title: 'Notification!',
        text: 'You just entered the wrong number format',
        icon: 'error',
        confirmButtonColor: 'darkgreen',
        confirmButtonText: 'OK'
      });
      this.ngOnInit();
    } else if (!Number.isInteger(quantity)) {
      Swal.fire({
        title: 'Notification!',
        text: 'You just entered the wrong integer format',
        icon: 'error',
        confirmButtonColor: 'darkgreen',
        confirmButtonText: 'OK'
      });
      this.ngOnInit();
    } else {
      for (const item of this.cartDetailDtos) {
        if (item.cartDetailId === cartDetailId) {
          if (quantity < 1) {
            Swal.fire({
              title: 'Notification!',
              text: 'You must enter a number greater than 1',
              icon: 'error',
              confirmButtonColor: 'darkgreen',
              confirmButtonText: 'OK'
            });
            quantity = item.quantity;
            this.ngOnInit();
            break;
          } else if (quantity > item.inventoryLevel) {
            quantity = item.quantity;
            Swal.fire({
              title: 'Notification!',
              text: 'You have entered an excess amount of inventory - The number of goods in stock ' + item.inventoryLevel,
              icon: 'error',
              confirmButtonColor: 'darkgreen',
              confirmButtonText: 'OK'
            });
            this.ngOnInit();
            break;
          } else {
            this.sum -= item.price * item.quantity;
            item.quantity = quantity;
            this.cartDetailService.updateQuantityOfCartDetailByCartDetailId(item.quantity, cartDetailId).subscribe(() => {
            });
            this.sum += item.price * quantity;
            this.total = this.sum + this.shippingPay;
            this.searchService.setTotal(this.total);
            break;
          }
        }
      }
    }
  }

  routeReceipt() {
    this.username = this.tokenStorageService.getUser().username;
    this.accountService.findUserEmail(this.username).subscribe(next => {
      this.accountId = next?.accountId;
      this.productService.findAllCartDetailByAccountId(this.accountId).subscribe(item => {
        this.cartDetailDtos = item;
        if (this.sum === 0) {
          this.getTotal();
        }
        this.getInventoryLevelBy();
      });
    });
  }

  getInventoryLevelBy() {
    for (const key of this.cartDetailDtos) {
      if (key.quantity > key.inventoryLevel) {
        key.quantity = key.inventoryLevel;
        this.flag = false;
        Swal.fire({
          title: 'Notification!',
          text: 'You have entered an excess amount of inventory - The number of goods in stock ' + key.inventoryLevel,
          icon: 'error',
          confirmButtonColor: 'darkgreen',
          confirmButtonText: 'OK'
        });

        this.cartDetailService.updateQuantityOfCartDetailByCartDetailId(key.quantity, key.cartDetailId).subscribe(() => {
        });
        break;
      } else {
        this.flag = true;
      }
    }
    if (this.flag === true) {
      this.router.navigateByUrl('/receipt');
    }
  }
}
