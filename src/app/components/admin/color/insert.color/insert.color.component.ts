import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsertColorlDTO } from 'src/app/dtos/color/insert.color.dto';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/service/color.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-insert.color',
  templateUrl: './insert.color.component.html',
  styleUrls: ['./insert.color.component.scss']
})
export class InsertColorComponent implements OnInit {
insertColorlDTO: InsertColorlDTO ={
  name:'',
};
colors: Color[]=[];
  constructor(
    private router:Router,
    private colorService: ColorService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  insertColor() {
    const ok = confirm('Bạn có muốn thêm màu mới không ?');
  if(!ok) return;
this.colorService.insertColor(this.insertColorlDTO).subscribe({
  next:(response)=>{
       this.toastService.showToast({
              error: null,
              defaultMsg: 'Thêm màu mới thành công',
              title: 'Success'
            });
    this.router.navigate(['/admin/colors']);
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
