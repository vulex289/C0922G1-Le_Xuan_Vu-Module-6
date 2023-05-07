import {Component, OnInit} from '@angular/core';
import {ShareService} from '../service/share.service';
import {TokenStorageService} from '../service/token-storage.service';
import {AccountService} from '../service/account.service';
import {Router} from '@angular/router';
import {ProductService} from '../service/product.service';
import {CartDetailService} from '../service/cart-detail.service';
import {SearchService} from '../service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username?: string;
  img?: string;
  name?: string;
  role?: string;
  isLoggedIn = false;
  itemCount = 0;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private accountService: AccountService,
              private router: Router,
              private cartDetailService: CartDetailService,
              private productService: ProductService,
              private searchService: SearchService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
    this.searchService.getCount().subscribe(count => {
      this.itemCount = count;
    });
  }


  ngOnInit(): void {
    this.loadHeader();
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
      this.isLoggedIn = this.username != null;
      this.findNameUser();
    } else {
      this.isLoggedIn = false;
    }

    console.log('isLog' + this.isLoggedIn);
  }

  findNameUser(): void {
    this.accountService.findUserEmail(this.username).subscribe(next => {
      this.name = next?.name;
      this.img = next?.avatar;
      this.productService.findAllCartDetailByAccountId(next?.accountId).subscribe(item => {
        this.itemCount = item?.length;
      });
    });
  }

  logOut() {
    this.tokenStorageService.signOut();
    this.ngOnInit();
    this.searchService.setCount(0);
    this.router.navigateByUrl('/login');
  }
}
