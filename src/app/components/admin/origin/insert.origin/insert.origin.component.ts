import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsertOriginlDTO } from 'src/app/dtos/origin/insert.origin.dto';
import { Origin } from 'src/app/models/origin';
import { OriginService } from 'src/app/service/origin.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-insert.origin',
  templateUrl: './insert.origin.component.html',
  styleUrls: ['./insert.origin.component.scss']
})
export class InsertOriginComponent implements OnInit {
insertOriginlDTO: InsertOriginlDTO ={
  name:'',
};
origins: Origin[]=[];
  constructor(
    private router:Router,
    private originService: OriginService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  insertOrigin() {
    const ok = confirm('Bạn có muốn thêm quốc gia mới không ?');
  if(!ok) return;
this.originService.insertOrigin(this.insertOriginlDTO).subscribe({
  next:(response)=>{
       this.toastService.showToast({
              error: null,
              defaultMsg: 'Thêm quốc gia thành công',
              title: 'Success'
            });
    this.router.navigate(['/admin/origins']);
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
