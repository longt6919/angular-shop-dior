import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Style } from 'src/app/models/style';
import { StyleService } from 'src/app/service/style.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit {

 styles:Style[]=[];
  constructor(
    private styleService: StyleService,
    private router:Router,
    private toastService:ToastService
  ) { }

  ngOnInit(): void {
    this.getStyles(0,100);
  }
  getStyles(page:number,limit:number){
    this.styleService.getStylesByAdmin(page,limit).subscribe({
      next:(styles:Style[])=>{
        this.styles = styles;
      },
      complete:()=>{},
      error:(error: any)=>{
        console.error('Error fetching styles:',error);
      }
    });
  }

       toggleStyleStatus(style: Style) {
        let confirmation: boolean;
        if (style.is_active) {
          confirmation = window.confirm('Bạn có muốn ẩn phong cách này ?');
        } else {
          confirmation = window.confirm('Bạn có muốn triển khai phong cách này ?');
        }
        
        if (confirmation) {
          const params = {
            styleId: style.id,
            enable: !style.is_active
          };
      
          this.styleService.toggleStyleStatus(params).subscribe({
            next: (apiResponse: any) => {
              console.error('Block/unblock style successfully');
                  this.toastService.showToast({
                error: null,
                defaultMsg: 'Thay đổi trạng thái phong cách thành công',
                title: 'Đã cập nhật phong cách'
              });
                style.is_active = !style.is_active;          
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
