import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {FormControl, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../service/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../service/login.service';
import {ShareService} from '../service/share.service';
import {FacebookLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

// import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  username = String;
  errorMessage = '';
  roles: string[] = [];
  returnUrl: string;
  rememberMe: boolean;
  userFb: SocialUser | null = null;

  constructor(private tokenStorageService: TokenStorageService,
              private authService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private shareService: ShareService,
              private auth1Service: SocialAuthService
  ) {
  }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      rememberMe: new FormControl(false)

    });

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
    this.returnUrl = this.route.snapshot.queryParams[' returnUrl'];
  }

  onSubmit() {
    this.authService.login(this.formLogin.value).subscribe(
      data => {
        if (this.formLogin.value.rememberMe) {
          this.tokenStorageService.saveTokenLocal(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        }

        this.authService.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.formLogin.reset();
        this.router.navigateByUrl(this.returnUrl);
        this.shareService.sendClickEvent();
      },
      err => {
        console.log('Lỗi aaaa');
        this.authService.isLoggedIn = false;
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
    );
  }

  signInWithFacebook() {
    this.auth1Service.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.userFb = data;
        console.log( data.authToken  + data.firstName + data.lastName +  'Vu');
        this.authService.isLoggedIn = true;
        this.router.navigateByUrl(this.returnUrl);
        this.shareService.sendClickEvent();
      }
    );
  }
}
