import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { CouponService } from 'src/app/service/coupon.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
 coupons:Coupon[]=[];
  constructor(
    private couponService: CouponService,
    private router:Router,
    private toastService:ToastService
  ) { }

  ngOnInit(): void {
    this.getCoupons(0,5);
  }
  getCoupons(page:number,limit:number){
    this.couponService.getListCoupon(page,limit).subscribe({
      next:(coupons:Coupon[])=>{
        this.coupons = coupons;
      },
      complete:()=>{},
      error:(error: any)=>{
        console.error('Error fetching coupon:',error);
      }
    });
  }

       toggleCouponStatus(coupon: Coupon) {
        let confirmation: boolean;
        if (coupon.active) {
          confirmation = window.confirm('Bạn có muốn dừng coupon này ?');
        } else {
          confirmation = window.confirm('Bạn có muốn triển khai coupon này ?');
        }
        
        if (confirmation) {
          const params = {
            couponId: coupon.id,
            enable: !coupon.active
          };
      
          this.couponService.toggleCouponStatus(params).subscribe({
            next: (apiResponse: any) => {
              console.error('Block/unblock coupon successfully');
                  this.toastService.showToast({
                error: null,
                defaultMsg: 'Thay đổi trạng thái thành công',
                title: 'Đã cập nhật'
              });
                coupon.active = !coupon.active;          
              },
            complete: () => {
              // Handle complete event
            },
            error: (error: HttpErrorResponse) => {
              this.toastService.showToast({
                error: error,
                defaultMsg: 'Lỗi thay đổi trạng thái',
                title: 'Lỗi Hệ Thống'
              });
            }
          });
        }      
      }
      
        generateVisiblePageArray(curentPage: number, totalPages: number):number[]{
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages/2);

    let startPage = Math.max(curentPage -  halfVisiblePages,1);
    let endPage = Math.min(startPage+maxVisiblePages -1,totalPages);

    if(endPage - startPage +1 < maxVisiblePages){
      startPage = Math.max(endPage -maxVisiblePages +1,1);
    }
    return new Array(endPage - startPage +1).fill(0)
    .map((_,index)=>startPage +index);
  }
updateStyle(styleId: number) {
this.router.navigate(['/admin/styles/update',styleId]);
}
insertStyle() {
      this.router.navigate(['/admin/styles/insert']);
}
  }


