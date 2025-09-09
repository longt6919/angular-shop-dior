import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilService } from './http.util.service';
import { RegisterDTO } from '../dtos/users/register.dto';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dtos/users/login.dto';
import { UserResponse } from '../responses/user/user.response';
import { UpdateUserDTO } from '../dtos/users/update.user.dto';
import { User } from '../models/user';
import { UpdateEmployeeDTO } from '../dtos/users/update.employee.dto';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUser =`${environment.apiBaseUrl}/api/v1/users`;
  private apiRegister =`${environment.apiBaseUrl}/api/v1/users/register`;
  private apiLogin =`${environment.apiBaseUrl}/api/v1/users/login`;
   private apiUserDetail =`${environment.apiBaseUrl}/api/v1/users/details`;
     localStorage?:Storage;

       private apiConfig={
    headers:this.httpUtilService.createHeaders(),
  }
  constructor(
        private http:HttpClient,
    private httpUtilService: HttpUtilService,
  ) { }
    register(registerDTO: RegisterDTO):Observable<any>{
    return this.http.post(this.apiRegister, registerDTO,this.apiConfig)
  }
    login(loginDTO:LoginDTO):Observable<any>{
  return this.http.post(this.apiLogin, loginDTO,this.apiConfig)
}
  getUserDetail(token: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUserDetail,null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }
  getEmployeeDetail(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUser}/${id}`)
  }
   updateEmployee(id:number,user:UpdateEmployeeDTO):Observable<UpdateEmployeeDTO>{
      return this.http.put<User>(`${this.apiUser}/${id}`,user,);
    }
  saveUserResponseToLocalStorage(userResponse?: UserResponse){
  try{
    if(userResponse == null ||!userResponse){
      return;
    }
    //Chuyển đổi object userResponse thành chuỗi JSON (vì localStorage chỉ lưu được chuỗi).
    const userResponseJSON = JSON.stringify(userResponse);
    //Lưu chuỗi JSON đó vào localStorage với key 'user'.
    localStorage.setItem('user',userResponseJSON);
    console.log('User response save to local storage.');
  }catch(error){
    console.log('Save user local storage false', error);
  }
}
getUserResponseFromLocalStorage():UserResponse | null{
  try{
    //Lấy chuỗi JSON từ localStorage với key là 'user'.
    const userResponseJSON = localStorage.getItem('user');
    if(userResponseJSON==null|| userResponseJSON==undefined){
      return null;
    }
    //Chuyển đổi chuỗi JSON thành object JavaScript.
    const userResponse = JSON.parse(userResponseJSON!);
    console.log('User response retrieved from local storage.');
    return userResponse;
  }catch(error){
    console.error('Error retrieving user response from local storage:',error);
    return null;
  }
}
removeUserFromLocalStorage():void{
  try{
    localStorage.removeItem('user');
    console.log('User data removed from local storage.');
  }catch(error){
    console.error('Error removing user data from local storage:', error);
  }
}
updateUserDetail(token: string, updateUserDTO:UpdateUserDTO){
  let userResponse = this.getUserResponseFromLocalStorage();
  return this.http.put(`${this.apiUserDetail}/${userResponse?.id}`,updateUserDTO,{
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: `Bearer ${token}`
    })
  })
}
getUsers(params: { page: number, limit: number, keyword: string }): Observable<any> {
    const url = `${this.apiUser}`;
    return this.http.get(url, { params: params });
  }
  getEmployee(params: { page: number, limit: number, keyword: string }): Observable<any> {
    const url = `${this.apiUser}/employee`;
    return this.http.get(url, { params: params });
  }

  resetPassword(userId: number): Observable<any> {
    const url = `${this.apiUser}/reset-password/${userId}`;
         return this.http.put(url, null, {
    ...this.apiConfig,
    responseType: 'text' as 'json'
  });
  }

  toggleUserStatus(params: { userId: number, enable: boolean }): Observable<any> {
    const url = `${this.apiUser}/block/${params.userId}/${params.enable ? '1' : '0'}`;
     return this.http.put(url, null, {
    ...this.apiConfig,
    responseType: 'text' as 'json' // 👈 thêm dòng này nếu backend trả string
  });
  }
}
