import { inject, Injectable } from "@angular/core";
import { TokenService } from "../service/token.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../service/user.service";
import { UserResponse } from "../responses/user/user.response";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard{
    constructor(private tokenService: TokenService,private router: Router){}
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isTokenExpired = this.tokenService.isTokenExpired();
        const isUserIdValid = this.tokenService.getUserId()>0;
        if(!isTokenExpired && isUserIdValid ){
            return true;
        }else{
    // Nếu không authenticated, bạn có thể redirect hoặc trả về một UrlTree khác.
    // Ví dụ trả về trang login:
            this.router.navigate(['/login']);
            return false;
        }
    }
}
//Su dung functional guard nhu sau:
export const AuthGuardFn: CanActivateFn = (
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot) :boolean =>{
        return inject(AuthGuard).canActivate(next,state);
    }
