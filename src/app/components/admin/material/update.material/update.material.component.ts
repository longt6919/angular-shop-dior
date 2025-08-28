import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateMaterialDTO } from 'src/app/dtos/material/update.material.dto';
import { Material } from 'src/app/models/material';
import { MaterialService } from 'src/app/service/material.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-update.material',
  templateUrl: './update.material.component.html',
  styleUrls: ['./update.material.component.scss']
})
export class UpdateMaterialComponent implements OnInit {
materialId: number;
  updatedMaterial: Material;
  constructor(
      private materialService: MaterialService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
     this.materialId =0;
    this.updatedMaterial = {} as Material;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.materialId = Number(params.get('id'));
      this.getMaterialDetails();
    })
  }
    getMaterialDetails():void{
    this.materialService.getDetailMaterial(this.materialId).subscribe({
      next:(material:Material)=>{
        this.updatedMaterial ={...material};
      },
      complete:() =>{},
      error:(error: any)=>{}
    });
  }
    updateMaterial() {
const updateMaterialDTO: UpdateMaterialDTO ={
  name: this.updatedMaterial.name,
};
 const ok = confirm('Bạn có muốn cập nhật lại không ?');
  if(!ok) return;
this.materialService.updateMaterial(this.updatedMaterial.id,updateMaterialDTO).subscribe({
  next:(response: any) =>{
          this.toastService.showToast({
              error: null,
              defaultMsg: 'Cập nhật chất liệu id '+this.materialId+' thành công',
              title: 'Thành công'
            });
  },
  complete:()=>{
    this.router.navigate(['/admin/materials']);
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
