import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'access_token';
  //dowload 2 thư viện này về
  //npm install -g yarn
  //yarn add @auth0/angular-jwt
  private jwtHelperService = new JwtHelperService();
  localStorage?: Storage;
  constructor(@Inject(DOCUMENT) private document: Document) {
     this.localStorage = document.defaultView?.localStorage;
  }
    //Lấy token từ localStorage, trả về null nếu không có
  getToken(): string {
       return this.localStorage?.getItem(this.TOKEN_KEY)?? '';
    // return localStorage.getItem(this.TOKEN_KEY);
  }
  setToken(token: string): void {
    this.localStorage?.setItem(this.TOKEN_KEY,token);
  }
  //Giải mã token để lấy thông tin user
getUserId(): number  {
  const token = this.getToken();
  if (!token) return 0;
  let userObject: any;
  try {
    userObject = this.jwtHelperService.decodeToken(token);
        console.log(' Token decoded:', userObject);
  } catch (err) {
    console.error('Lỗi decode token:', err);
    return 0;
  }
  if (userObject && 'userId' in userObject) {
    return parseInt(userObject['userId']);
  }
  return 0;
}

  removeToken():void{
    localStorage.removeItem(this.TOKEN_KEY);
  }
    isTokenExpired(): boolean { 
        if(this.getToken() == null) {
            return false;
        }       
        return this.jwtHelperService.isTokenExpired(this.getToken()!);
      }

}
