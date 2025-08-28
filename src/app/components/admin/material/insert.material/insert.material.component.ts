import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsertMaterialDTO } from 'src/app/dtos/material/insert.material.dto';
import { Material } from 'src/app/models/material';
import { MaterialService } from 'src/app/service/material.service';
import { StyleService } from 'src/app/service/style.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-insert.material',
  templateUrl: './insert.material.component.html',
  styleUrls: ['./insert.material.component.scss']
})
export class InsertMaterialComponent implements OnInit {
insertMaterialDTO: InsertMaterialDTO ={
  name:'',
};
materials: Material[]=[];
  constructor(
    private router:Router,
    private materialService: MaterialService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  insertMaterial() {
    const ok = confirm('Bạn có muốn thêm chất liệu mới không ?');
  if(!ok) return;
this.materialService.insertMaterial(this.insertMaterialDTO).subscribe({
  next:(response)=>{
       this.toastService.showToast({
              error: null,
              defaultMsg: 'Thêm chất liệu thành công',
              title: 'Success'
            });
    this.router.navigate(['/admin/materials']);
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
