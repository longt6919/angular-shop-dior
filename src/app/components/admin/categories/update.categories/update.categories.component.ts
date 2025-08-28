import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateCategoryDTO } from 'src/app/dtos/category/UpdateCategoryDTO';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-update.categories',
  templateUrl: './update.categories.component.html',
  styleUrls: ['./update.categories.component.scss']
})
export class UpdateCategoriesComponent implements OnInit {
 categoryId: number;
  updatedCategory:Category;
  constructor(
      private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
     this.categoryId =0;
    this.updatedCategory = {} as Category;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.categoryId = Number(params.get('id'));
      this.getCategoryDetails();
    })
  }
    getCategoryDetails():void{
    this.categoryService.getDetailCategory(this.categoryId).subscribe({
      next:(category:Category)=>{
        this.updatedCategory ={...category};
      },
      complete:() =>{},
      error:(error: any)=>{}
    });
  }
    updateCategory() {
const updateCategoryDTO: UpdateCategoryDTO ={
  name: this.updatedCategory.name,
};
 const ok = confirm('Bạn có muốn cập nhật lại không ?');
  if(!ok) return;
this.categoryService.updateCategory(this.updatedCategory.id,updateCategoryDTO).subscribe({
  next:(response: any) =>{
          this.toastService.showToast({
              error: null,
              defaultMsg: 'Cập nhật danh mục id '+this.categoryId+' thành công',
              title: 'Thành công'
            });
  },
  complete:()=>{
    this.router.navigate(['/admin/categories']);
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
