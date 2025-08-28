import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateEmployeeDTO } from 'src/app/dtos/users/update.employee.dto';
import { User } from 'src/app/models/user';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-update.employee',
  templateUrl: './update.employee.component.html',
  styleUrls: ['./update.employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
userId: number;
  updatedUser: User;
email: any;
  constructor(    
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
    ) 
    {    
    this.userId = 0;
    this.updatedUser = {} as User;   
  }

  ngOnInit(): void {
       this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
      this.getUserDetail();
    });
  }
   getUserDetail():void {
    this.userService.getEmployeeDetail(this.userId).subscribe({
      next:(user:User)=>{
        this.updatedUser ={...user,
 date_of_birth: new Date(user.date_of_birth),
        };
        
      },
      complete:() =>{},
      error:(error: any)=>{}
    });  
  }

    
       updateUser() {
   const updateEmployeeDTO: UpdateEmployeeDTO ={
         phone_number: this.updatedUser.phone_number,
     fullname: this.updatedUser.fullname,
     address: this.updatedUser.address,
     date_of_birth: this.updatedUser.date_of_birth,
     email: this.updatedUser.email,
   };
    const ok = confirm('Bạn có muốn cập nhật lại không ?');
     if(!ok) return;
   this.userService.updateEmployee(this.updatedUser.id,updateEmployeeDTO).subscribe({
     next:(response: any) =>{
             this.toastService.showToast({
                 error: null,
                 defaultMsg: 'Cập nhật nhân viên id '+this.userId+' thành công',
                 title: 'Thành công'
               });
     },
     complete:()=>{
       this.router.navigate(['/admin/employees']);
     },
     error:(error: any)=>{
             this.toastService.showToast({
                 error: error,
                 defaultMsg: 'Cập nhật thất bại',
                 title: 'Lỗi'
               });
     }
   })
   }

 

}


