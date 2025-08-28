import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/service/brand.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
 brands:Brand[]=[];
  constructor(
    private brandService: BrandService,
    private router:Router,
    private toastService:ToastService
  ) { }

  ngOnInit(): void {
    this.getBrands(0,100);
  }
  getBrands(page:number,limit:number){
    this.brandService.getBrandsByAdmin(page,limit).subscribe({
      next:(brands:Brand[])=>{
        this.brands = brands;
      },
      complete:()=>{},
      error:(error: any)=>{
   this.toastService.showToast({
              error: error,
              defaultMsg: 'Load dữ liệu thất bại',
              title: 'Fail'
            });       }
    });
  }
         toggleBrandStatus(brand: Brand) {
          let confirmation: boolean;
          if (brand.is_active) {
            confirmation = window.confirm('Bạn có muốn ẩn thương hiệu này ?');
          } else {
            confirmation = window.confirm('Bạn có muốn triển khai thương hiệu này ?');
          }
          
          if (confirmation) {
            const params = {
              brandId: brand.id,
              enable: !brand.is_active
            };
        
            this.brandService.toggleBrandStatus(params).subscribe({
              next: (apiResponse: any) => {
                console.error('Block/unblock brand successfully');
                    this.toastService.showToast({
                  error: null,
                  defaultMsg: 'Thay đổi trạng thái thương hiệu thành cồng',
                  title: 'Đã cập nhật trạng thái'
                });
                  brand.is_active = !brand.is_active;          
                },
              complete: () => {
                // Handle complete event
              },
              error: (error: HttpErrorResponse) => {
                this.toastService.showToast({
                  error: error,
                  defaultMsg: 'Lỗi thay đổi trạng thái sản phẩm',
                  title: 'Lỗi Hệ Thống'
                });
              }
            });
          }      
        }

updateBrand(brandId: number) {
this.router.navigate(['/admin/brand/update',brandId]);
}
insertBrand() {
      this.router.navigate(['/admin/brand/insert']);
}

}
