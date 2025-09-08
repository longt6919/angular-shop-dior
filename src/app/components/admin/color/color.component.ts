import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/service/color.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
colors:Color[]=[];
  currentPage: number =0;
  itemsPerpage: number =12;
  pages: number[] =[];
  totalPages: number =0;
  visiblePages: number[]=[];
  keyword: string ="";
   constructor(
     private colorService: ColorService,
     private router:Router,
     private toastService:ToastService
   ) { }
 
   ngOnInit(): void {
        this.currentPage =Number(localStorage.getItem('currentColorAdminPage')) || 0;
  this.getColors(this.currentPage, this.itemsPerpage);
   }
   
getColors(page: number, limit: number) {
  this.colorService.getAdminColors(page, limit).subscribe({
    next: (response: any) => {
      this.colors = response.content;            
      this.totalPages = response.totalPages;     
      this.currentPage = response.number;       
      this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
    },
    complete: () => {},
    error: (error: any) => {
      this.toastService.showToast({
        error: error,
        defaultMsg: 'Load dữ liệu thất bại',
        title: 'Fail'
      });
    }
  });
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
   onPageChange(page: number){
    this.currentPage = page < 0?0:page;
    localStorage.setItem('currentColorAdminPage',String(this.currentPage));
    this.getColors(this.currentPage,this.itemsPerpage);
  }
    
 updateColor(colorId: number) {
 this.router.navigate(['/admin/colors/update',colorId]);
 }
 insertColor() {
       this.router.navigate(['/admin/colors/insert']);
 }


}
