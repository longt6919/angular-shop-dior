import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDTO } from 'src/app/dtos/users/register.dto';
import { AuthService } from 'src/app/service/auth.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-insert.employee',
  templateUrl: './insert.employee.component.html',
  styleUrls: ['./insert.employee.component.scss']
})
export class InsertEmployeeComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
phoneNumber: string;
password: string;
retypePassword: string;
fullName: string;
dateOfBirth: Date;
address: string;
isAccepted: boolean;

constructor( private router: Router, private userService: UserService,
  private authService: AuthService, private toastService: ToastService
){
  this.phoneNumber='';
  this.password='';
  this.retypePassword='';
  this.fullName='';
  this.address='';
  this.dateOfBirth= new Date();
  this.isAccepted =false;
  this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() -16)// kiem tra xem da du 18 tuoi chua
}
onPhoneChage(){
  console.log("HI");
}
register(){
const message = 
`phone_number: ${this.phoneNumber}`+
`password: ${this.password}`+
`retype_password: ${this.retypePassword}`+
`address: ${this.address}`+
`fullname: ${this.fullName}`+
`isAccepted: ${this.isAccepted}`+
`dateOfBirth: ${this.dateOfBirth}`;
debugger
const registerDTO:RegisterDTO ={
  "fullname": this.fullName,
  "phone_number": this.phoneNumber,
  "address": this.address,  
  "password": this.password,
  "retype_password": this.retypePassword,
  "date_of_birth": this.dateOfBirth,
  "facebook_account_id": null,
  "google_account_id": null,
  "role_id": 3
}
  if (!this.isAccepted) {
    const ctrl = this.registerForm.form.controls['isAccepted'];
    if (ctrl) { ctrl.setErrors({ required: true }); }
    return;
  }
this.userService.register(registerDTO).subscribe({
  next: (apiResponse: any)=>{
    debugger
    const confirmation = window
            .confirm('Đăng ký thành công');
          if (confirmation) {
            this.router.navigate(['/admin/employees']);
          }
  },
  complete:() =>{
      debugger
  },
  error:(error: any)=>{
   this.toastService.showToast({
            error: error,
            defaultMsg: '',
            title: 'Lỗi đăng ký'
          });  }
})
// this.http.post(apiUrl,registerData,{headers}).subscribe();
}
checkPasswordsMatch(){
  const control = this.registerForm.form.controls['retype_password'];
  if (control) {
    if (this.password !== this.retypePassword) {
      control.setErrors({ passwordMismatch: true });
    } else {
      control.setErrors(null);
    }
  }
}
checkAge(){
  const control = this.registerForm.form.controls['dateOfBirth'];
  if (control && this.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      control.setErrors({ invalidAge: true });
    } else {
      control.setErrors(null);
    }
  }
}
  ngOnInit(): void {
  }
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
}
