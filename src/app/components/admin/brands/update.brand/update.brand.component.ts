import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateBrandDTO } from 'src/app/dtos/brand/update.brand.dto';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/service/brand.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-update.brand',
  templateUrl: './update.brand.component.html',
  styleUrls: ['./update.brand.component.scss']
})
export class UpdateBrandComponent implements OnInit {
brandId: number;
  updatedBrand:Brand;
  constructor(
      private brandService: BrandService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
     this.brandId =0;
    this.updatedBrand = {} as Brand;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.brandId = Number(params.get('id'));
      this.getBrandDetails();
    })
  }
    getBrandDetails():void{
    this.brandService.getDetailBrand(this.brandId).subscribe({
      next:(brand:Brand)=>{
        this.updatedBrand ={...brand};
      },
      complete:() =>{},
      error:(error: any)=>{}
    });
  }
    updateBrand() {
const updateBrandDTO: UpdateBrandDTO ={
  name: this.updatedBrand.name,
  description: this.updatedBrand.description,
};
 const ok = confirm('Bạn có muốn cập nhật lại không ?');
  if(!ok) return;
this.brandService.updateBrand(this.updatedBrand.id,updateBrandDTO).subscribe({
  next:(response: any) =>{
          this.toastService.showToast({
              error: null,
              defaultMsg: 'Cập nhật thương hiệu id '+this.brandId+' thành công',
              title: 'Thành công'
            });
  },
  complete:()=>{
    this.router.navigate(['/admin/brands']);
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
