import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateColorDTO } from 'src/app/dtos/color/update.color.dto';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/service/color.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-update.color',
  templateUrl: './update.color.component.html',
  styleUrls: ['./update.color.component.scss']
})
export class UpdateColorComponent implements OnInit {
colorId: number;
  updatedColor: Color;
  constructor(
      private colorService: ColorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
     this.colorId =0;
    this.updatedColor = {} as Color;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.colorId = Number(params.get('id'));
      this.getColorDetails();
    })
  }
    getColorDetails():void{
    this.colorService.getDetailColor(this.colorId).subscribe({
      next:(color:Color)=>{
        this.updatedColor ={...color};
      },
      complete:() =>{},
      error:(error: any)=>{}
    });
  }
    updateColor() {
const updateColorDTO: UpdateColorDTO ={
  name: this.updatedColor.name,
};
 const ok = confirm('Bạn có muốn cập nhật lại không ?');
  if(!ok) return;
this.colorService.updateColor(this.updatedColor.id,updateColorDTO).subscribe({
  next:(response: any) =>{
          this.toastService.showToast({
              error: null,
              defaultMsg: 'Cập nhật màu sắc id '+this.colorId+' thành công',
              title: 'Thành công'
            });
  },
  complete:()=>{
    this.router.navigate(['/admin/colors']);
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
