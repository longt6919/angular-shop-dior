import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {
  //header là phần thông tin bổ sung được gửi kèm theo request hoặc response, nằm ở đầu mỗi gói tin
createHeaders(): HttpHeaders{
return new HttpHeaders({
  'Content-Type': 'application/json',//Xác định kiểu dữ liệu gửi đi là JSON
  'Accept-Language':'vi',//Yêu cầu server trả về nội dung bằng tiếng Việt
});
}
}
