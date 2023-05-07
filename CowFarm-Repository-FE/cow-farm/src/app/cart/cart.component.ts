import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {TokenStorageService} from '../service/token-storage.service';
import {AccountService} from '../service/account.service';
import Swal from 'sweetalert2';
import {ViewportScroller} from '@angular/common';
import {ICartDetailDto} from '../dto/icart-detail-dto';
import {CartDetailService} from '../service/cart-detail.service';
import {SearchService} from '../service/search.service';

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

  constructor(private productService: ProductService,
              private tokenStorageService: TokenStorageService,
              private accountService: AccountService,
              private viewportScroller: ViewportScroller,
              private cartDetailService: CartDetailService,
              private searchService: SearchService) {
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
            title: 'Thông báo!',
            text: 'Bạn đã nhập quá số lượng tồn kho - Số lượng tồn kho còn ' + this.cartDetailDtos[i].inventoryLevel,
            icon: 'error',
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
          title: 'Thông báo!',
          text: 'Bạn vừa bỏ mặt hàng ' + productName,
          icon: 'success',
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
        title: 'Thông báo!',
        text: 'Bạn vừa nhập sai định dạng số',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.ngOnInit();
    } else {
      for (const item of this.cartDetailDtos) {
        if (item.cartDetailId === cartDetailId) {
          if (quantity < 1) {
            Swal.fire({
              title: 'Thông báo!',
              text: 'Bạn phải nhập số lớn hơn 1',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            quantity = item.quantity;
            this.ngOnInit();
            break;
          } else if (quantity > item.inventoryLevel) {
            quantity = item.quantity;
            Swal.fire({
              title: 'Thông báo!',
              text: 'Bạn đã nhập quá số lượng tồn kho - Số lượng tồn kho còn ' + item.inventoryLevel,
              icon: 'error',
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
}
