import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Origin } from 'src/app/models/origin';
import { OriginService } from 'src/app/service/origin.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.scss']
})
export class OriginComponent implements OnInit {
  origins:Origin[]=[];
   constructor(
     private originService: OriginService,
     private router:Router,
     private toastService:ToastService
   ) { }
 
   ngOnInit(): void {
     this.getOrigins(0,100);
   }
   getOrigins(page:number,limit:number){
     this.originService.getOrigins(page,limit).subscribe({
       next:(origins:Origin[])=>{
         this.origins = origins;
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
    
 updateOrigin(originId: number) {
 this.router.navigate(['/admin/origins/update',originId]);
 }
 insertOrigin() {
       this.router.navigate(['/admin/origins/insert']);
 }

}
