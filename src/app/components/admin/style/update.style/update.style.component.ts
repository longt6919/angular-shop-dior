import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateStyleDTO } from 'src/app/dtos/style/update.style.dto';
import { Style } from 'src/app/models/style';
import { StyleService } from 'src/app/service/style.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-update.style',
  templateUrl: './update.style.component.html',
  styleUrls: ['./update.style.component.scss']
})
export class UpdateStyleComponent implements OnInit {
styleId: number;
  updatedStyle:Style;
  constructor(
      private styleService: StyleService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
     this.styleId =0;
    this.updatedStyle = {} as Style;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.styleId = Number(params.get('id'));
      this.getStyleDetails();
    })
  }
    getStyleDetails():void{
    this.styleService.getDetailStyle(this.styleId).subscribe({
      next:(style:Style)=>{
        this.updatedStyle ={...style};
      },
      complete:() =>{},
      error:(error: any)=>{}
    });
  }
    updateStyle() {
const updateStyleDTO: UpdateStyleDTO ={
  name: this.updatedStyle.name,
};
 const ok = confirm('Bạn có muốn cập nhật lại không ?');
  if(!ok) return;
this.styleService.updateStyle(this.updatedStyle.id,updateStyleDTO).subscribe({
  next:(response: any) =>{
          this.toastService.showToast({
              error: null,
              defaultMsg: 'Cập nhật phong cách id '+this.styleId+' thành công',
              title: 'Thành công'
            });
  },
  complete:()=>{
    this.router.navigate(['/admin/styles']);
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
