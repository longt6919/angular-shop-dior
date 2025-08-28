import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    categories:Category[]=[];
  constructor(
    private categoryService: CategoryService,
    private router:Router,
    private toastService:ToastService
  ) { }

  ngOnInit(): void {
    this.getCategories(0,100);
  }
  getCategories(page:number,limit:number){
    this.categoryService.getCategoriesByAdmin(page,limit).subscribe({
      next:(categories:Category[])=>{
        this.categories = categories;
      },
      complete:()=>{},
      error:(error: any)=>{
        console.error('Error fetching categories:',error);
      }
    });
  }

       toggleCategoryStatus(category: Category) {
        let confirmation: boolean;
        if (category.is_active) {
          confirmation = window.confirm('Bạn có muốn ẩn danh mục này ?');
        } else {
          confirmation = window.confirm('Bạn có muốn triển khai danh mục này ?');
        }
        
        if (confirmation) {
          const params = {
            categoryId: category.id,
            enable: !category.is_active
          };
      
          this.categoryService.toggleCategoryStatus(params).subscribe({
            next: (apiResponse: any) => {
              console.error('Block/unblock category successfully');
                  this.toastService.showToast({
                error: null,
                defaultMsg: 'Thay đổi trạng thái danh mục thành cồng',
                title: 'Đã cập nhật trạng thái'
              });
                category.is_active = !category.is_active;          
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
//   deleteCategory(category:Category) {
// const confirmation = window.confirm('Are you sure you want delete this category?');
// if(!confirmation) return;
//   this.categoryService.deleteCategory(category.id).subscribe({
//     next:(response: string)=>{
//       alert("Xóa danh mục thành công")
// this.getCategories(0,100);
//     },
//     complete:()=>{},
//     error:(error:any)=>{
//       alert(error.error)
//       console.error('Error fetching categories',error);
//     }
//   })
// }
updateCategory(categoryId: number) {
this.router.navigate(['/admin/categories/update',categoryId]);
}
insertCategory() {
      this.router.navigate(['/admin/categories/insert']);
}
  

}
