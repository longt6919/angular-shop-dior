import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsertBrandDTO } from 'src/app/dtos/brand/insert.brand.dto';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/service/brand.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-insert.brand',
  templateUrl: './insert.brand.component.html',
  styleUrls: ['./insert.brand.component.scss']
})
export class InsertBrandComponent implements OnInit {
insertBrandDTO: InsertBrandDTO ={
  name:'',
  description:''
};
brands: Brand[]=[];
  constructor(
    private router:Router,
    private brandService: BrandService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  insertBrand() {
    const ok = confirm('Bạn có muốn thêm thương hiệu mới không ?');
  if(!ok) return;
this.brandService.insertBrand(this.insertBrandDTO).subscribe({
  next:(response)=>{
       this.toastService.showToast({
              error: null,
              defaultMsg: 'Thêm thương hiệu thành công',
              title: 'Success'
            });
    this.router.navigate(['/admin/brands']);
  },
  error:(error:any)=>{
   this.toastService.showToast({
              error: error,
              defaultMsg: 'Thêm mới thất bại',
              title: 'Fail'
            });  }
});
  }

}
