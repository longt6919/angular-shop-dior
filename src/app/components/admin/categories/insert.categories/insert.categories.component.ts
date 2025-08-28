import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsertCategoryDTO } from 'src/app/dtos/category/insert.category.dto';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-insert.categories',
  templateUrl: './insert.categories.component.html',
  styleUrls: ['./insert.categories.component.scss']
})
export class InsertCategoriesComponent implements OnInit {
insertCategoryDTO: InsertCategoryDTO ={
  name:'',
};
categories: Category[]=[];
  constructor(
    private router:Router,
    private categoryService: CategoryService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  insertCategory() {
    const ok = confirm('Bạn có muốn thêm danh mục mới không ?');
  if(!ok) return;
this.categoryService.insertCategory(this.insertCategoryDTO).subscribe({
  next:(response)=>{
       this.toastService.showToast({
              error: null,
              defaultMsg: 'Thêm danh mục thành công',
              title: 'Success'
            });
    this.router.navigate(['/admin/categories']);
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
