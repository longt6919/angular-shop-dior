import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
import { RoleService } from 'src/app/service/role.service';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { LoginDTO } from 'src/app/dtos/users/login.dto';
import { LoginResponse } from 'src/app/responses/user/login.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService,
    private cartService: CartService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
loginWithFacebook() {
this.authService.authenticate('facebook').subscribe({
      next: (url: string) => {
        debugger
        // Chuyển hướng người dùng đến URL đăng nhập Facebook
        window.location.href = url;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.showToast({
          error: error,
          defaultMsg: 'Lỗi kết nối với Facebook',
          title: 'Lỗi Đăng Nhập'
        });
      }
    });}
loginWithGoogle() {
 this.authService.authenticate('google').subscribe({
      next: (url: string) => {
        debugger
        // Chuyển hướng người dùng đến URL đăng nhập Google
        window.location.href = url;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.showToast({
          error: error,
          defaultMsg: 'Lỗi kết nối với Google',
          title: 'Lỗi Đăng Nhập'
        });
      }
    });}
  @ViewChild('loginForm') loginForm!: NgForm;
  //Login user
  phoneNumber: string = '';
  password: string = '';

  roles: Role[] = []; // Mảng role
  rememberMe: boolean = true;
  selectedRole: Role | undefined; //Biến để lưu gtri đc chọn từ dropdown
  userResponse?: UserResponse;



  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
  }

  login() {
    const message =
      `phone_number: ${this.phoneNumber}` + `password: ${this.password}`;
    debugger;
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1,
    };
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger;
        const { token } = response;
        if (this.rememberMe) {
          this.tokenService.setToken(token);
          this.userService.getUserDetail(token).subscribe({
            next: (response: any) => {
              this.userResponse = {
                ...response,
                date_of_birth: new Date(response.date_of_birth),
              };
              this.userService.saveUserResponseToLocalStorage(this.userResponse);
              console.log('Gọi xong saveUserResponseToLocalStorage');
              if(this.userResponse?.role.name =='admin'){
                this.router.navigate(['/admin']);
              }else if(this.userResponse?.role.name =='user'){
                this.router.navigate(['/']);
              }else if(this.userResponse?.role.name =='employee'){
                this.router.navigate(['/']);
              }
            },
            complete: () => {
              this.cartService.refreshCart();
            },
            error: (error: any) => {
              this.toastService.showToast({
          error: error,
          defaultMsg: '',
          title: 'Lưu thất bại'
        });
            },
          });
        }
      },
      complete: () => {
              this.toastService.showToast({
          error: null,
          defaultMsg: 'Success',
          title: 'Đăng Nhập Thành Công'
        });
      },
      error: (error: any) => {
         this.toastService.showToast({
          error: error,
          defaultMsg: '',
          title: 'Lỗi Đăng Nhập'
        });
      },
    });
    // this.http.post(apiUrl,registerData,{headers}).subscribe();
  }

  createAccount() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
    //gọi API lấy danh sách roles va luw vào biến roles
    debugger;
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        //sử dụng kiểu Role[]
        debugger;
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error getting roles:', error);
      },
    });
  }

}
