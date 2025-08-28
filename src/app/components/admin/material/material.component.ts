import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Material } from 'src/app/models/material';
import { MaterialService } from 'src/app/service/material.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  materials:Material[]=[];
   constructor(
     private materialService: MaterialService,
     private router:Router,
     private toastService:ToastService
   ) { }
 
   ngOnInit(): void {
     this.getMaterials(0,100);
   }
   getMaterials(page:number,limit:number){
     this.materialService.getMaterials(page,limit).subscribe({
       next:(materials:Material[])=>{
         this.materials = materials;
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
    
 updateMaterial(materialId: number) {
 this.router.navigate(['/admin/materials/update',materialId]);
 }
 insertMaterial() {
       this.router.navigate(['/admin/materials/insert']);
 }

}
