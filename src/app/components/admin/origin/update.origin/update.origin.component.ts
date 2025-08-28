import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateOriginDTO } from 'src/app/dtos/origin/update.origin.dto';
import { Origin } from 'src/app/models/origin';
import { OriginService } from 'src/app/service/origin.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-update.origin',
  templateUrl: './update.origin.component.html',
  styleUrls: ['./update.origin.component.scss']
})
export class UpdateOriginComponent implements OnInit {
originId: number;
  updatedOrigin: Origin;
  constructor(
      private originService: OriginService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
     this.originId =0;
    this.updatedOrigin = {} as Origin;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.originId = Number(params.get('id'));
      this.getOriginDetails();
    })
  }
    getOriginDetails():void{
    this.originService.getDetailOrigin(this.originId).subscribe({
      next:(origin:Origin)=>{
        this.updatedOrigin ={...origin};
      },
      complete:() =>{},
      error:(error: any)=>{}
    });
  }
    updateOrigin() {
const updateOriginDTO: UpdateOriginDTO ={
  name: this.updatedOrigin.name,
};
 const ok = confirm('Bạn có muốn cập nhật lại không ?');
  if(!ok) return;
this.originService.updateOrigin(this.updatedOrigin.id,updateOriginDTO).subscribe({
  next:(response: any) =>{
          this.toastService.showToast({
              error: null,
              defaultMsg: 'Cập nhật quốc gia id '+this.originId+' thành công',
              title: 'Thành công'
            });
  },
  complete:()=>{
    this.router.navigate(['/admin/origins']);
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
