import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { ApiResponse } from 'src/app/responses/api.response';
import { UserResponse } from 'src/app/responses/user/user.response';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { ToastService } from 'src/app/service/toast.service';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
  userResponse?: UserResponse;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private tokenService: TokenService,
    private userService: UserService,
    private toastService: ToastService,
    private cartService: CartService
  ) { }

 ngOnInit(): void {
    debugger;
    const url = this.router.url;
    let loginType: 'google' | 'facebook';
    if (url.includes('/auth/google/callback')) {
      loginType = 'google';
    } else if (url.includes('/auth/facebook/callback')) {
      loginType = 'facebook';
    } else {
      console.error('Không xác định được nhà cung cấp xác thực.');
      return;
    }
    /// Lấy mã xác thực từ URL
    this.activatedRoute.queryParams.subscribe((params) => {
      debugger;
      const code = params['code'];
      if (code) {
        // Gửi mã này đến server để lấy token
        this.authService
          .exchangeCodeForToken(code, loginType)
          .pipe(
            tap((response: ApiResponse) => {
              debugger;
              // Giả sử API trả về token trong response.data
              const token = response.data.token;
              // Lưu token
              this.tokenService.setToken(token);
            }),
            switchMap((response) => {
              debugger;
              const token = response.data.token;
              // Gọi hàm getUserDetail với token
              return this.userService.getUserDetail(token);
            })
          )
          .subscribe({
            next: (userResponse: UserResponse) => {
              console.log('apiResponse: ', userResponse);
              // Xử lý thông tin người dùng
              debugger;
              this.userResponse = {
                ...userResponse,
                 date_of_birth: userResponse?.date_of_birth
    ? new Date(userResponse.date_of_birth)
    : new Date(),

              };
              this.userService.saveUserResponseToLocalStorage(
                this.userResponse
              );
            console.log('ROLE NAME:',this.userResponse?.fullname );
              // Điều hướng người dùng dựa trên vai trò
              if (this.userResponse?.role.name === 'admin') {
                this.router.navigate(['/admin']);
              } else if (this.userResponse?.role.name === 'user') {
                this.router.navigate(['/']);
              } else {
                this.toastService.showToast({
                  error: null,
                  defaultMsg: 'Không xác định vai trò người dùng',
                  title: 'Lỗi phân quyền',
                });
              }
            },
            error: (error: HttpErrorResponse) => {
              this.toastService.showToast({
                error: error,
                defaultMsg: 'Lỗi xác thực tài khoản',
                title: 'Lỗi Đăng Nhập',
              });
            },
            complete: () => {
              // Thực hiện các tác vụ khác nếu cần
              this.cartService.refreshCart();
            },
          });
      } else {
        this.toastService.showToast({
          error: null,
          defaultMsg: 'Lỗi hệ thống xác thực',
          title: 'Lỗi Đăng Nhập',
        });
      }
    });
  }

}
