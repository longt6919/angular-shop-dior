import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsertStyleDTO } from 'src/app/dtos/style/insert.style.dto';
import { Style } from 'src/app/models/style';
import { StyleService } from 'src/app/service/style.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-insert.style',
  templateUrl: './insert.style.component.html',
  styleUrls: ['./insert.style.component.scss']
})
export class InsertStyleComponent implements OnInit {
insertStyleDTO: InsertStyleDTO ={
  name:'',
};
styles: Style[]=[];
  constructor(
    private router:Router,
    private styleService: StyleService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  insertStyle() {
    const ok = confirm('Bạn có muốn thêm phong cách mới không ?');
  if(!ok) return;
this.styleService.insertStyle(this.insertStyleDTO).subscribe({
  next:(response)=>{
       this.toastService.showToast({
              error: null,
              defaultMsg: 'Thêm phong cách thành công',
              title: 'Success'
            });
    this.router.navigate(['/admin/styles']);
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
