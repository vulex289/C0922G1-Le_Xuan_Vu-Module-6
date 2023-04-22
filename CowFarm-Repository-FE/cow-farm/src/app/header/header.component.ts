import {Component, OnInit} from '@angular/core';
import {ShareService} from '../service/share.service';
import {TokenStorageService} from '../service/token-storage.service';
import Swal from 'sweetalert2';

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

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  ngOnInit(): void {
    this.loadHeader();
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
    // this.findNameUser();
  }

  // findNameUser(): void {
  //   if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_TEACHER') {
  //     this.accountService.findNameByEmail(this.username).subscribe(next => {
  //       this.name = next.teacherName;
  //       this.img = next.teacherImg;
  //     });
  //   }
  //   }

  logOut() {
    console.log(this.isLoggedIn + 'aaa');
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: 'error',
      title: 'Tên đăng nhập hoặc mật khẩu không đúng'
    });
  }
}
