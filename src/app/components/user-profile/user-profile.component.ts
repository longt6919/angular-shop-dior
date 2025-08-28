import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserDTO } from 'src/app/dtos/users/update.user.dto';
import { UserResponse } from 'src/app/responses/user/user.response';
import { ToastService } from 'src/app/service/toast.service';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userResponse?:UserResponse;
userProfileForm: FormGroup;
token:string ='';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService,
    private toastService: ToastService
  ) { 
        this.userProfileForm = this.formBuilder.group({
        fullname:[''],
        address:['',[Validators.minLength(3)]],
        current_password :['',[Validators.minLength(3)]],
        password:['',[Validators.minLength(3)]],
        retype_password:['',[Validators.minLength(3)]],
        date_of_birth:[Date.now()],
      },{
        validators : this.passwordMatchValidator //kiem tra pass nhap lai co khop k
      });
  }
  

  ngOnInit(): void {
        this.token = this.tokenService.getToken()!;
    this.userService.getUserDetail(this.token).subscribe({
next: (response: any) =>{
  this.userResponse ={
    ...response,
    date_of_birth: new Date(response.date_of_birth),
  };
  this.userProfileForm.patchValue({
    fullname: this.userResponse?.fullname?? '',
    address: this.userResponse?.address?? '',
    date_of_birth: this.userResponse?.date_of_birth.toISOString().substring(0,10),
  });
  this.userService.saveUserResponseToLocalStorage(this.userResponse);
},
complete:()=>{},
error: (error: any) =>{
   this.toastService.showToast({
                 error: error,
                 defaultMsg: 'Cập nhật thất bại',
                 title: 'Lỗi'
               });
}
    })
  }
  passwordMatchValidator():ValidatorFn{
return (formGroup: AbstractControl): ValidationErrors | null =>{
  const password = formGroup.get('password')?.value;
  const retypedPassword = formGroup.get('retype_password')?.value;
  if(password !== retypedPassword){
    return {passwordMismatch:true};
  }
  return null;
}
  };
    save(): void {
if(this.userProfileForm.valid){
  const updateUserDTO: UpdateUserDTO ={
    fullname: this.userProfileForm.get('fullname')?.value,
    address: this.userProfileForm.get('address')?.value,
    current_password: this.userProfileForm.get('current_password')?.value,
    password: this.userProfileForm.get('password')?.value,
    retype_password: this.userProfileForm.get('retype_password')?.value,
    date_of_birth: this.userProfileForm.get('date_of_birth')?.value,
  };
  this.userService.updateUserDetail(this.token, updateUserDTO).subscribe({
    next: (response: any) =>{
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
          alert("Cập nhật thông tin thành công đang chuyển hướng đăng nhập")
      this.router.navigate(['/login']);
    },
    error:(error: any) =>{
   this.toastService.showToast({
                 error: error,
                 defaultMsg: 'Cập nhật thất bại',
                 title: 'Lỗi'
               });
    }
  });
}else{
  if(this.userProfileForm.hasError('passwordMismatch')){
    alert("Mật khẩu và xác nhận mật khẩu chưa chính xác")
  }
}
  }
}
