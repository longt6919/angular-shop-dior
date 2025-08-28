import { inject, Injectable } from "@angular/core";
import { UserResponse } from "../responses/user/user.response";
import { TokenService } from "../service/token.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
userResponse?:UserResponse | null;
constructor(
  private tokenService: TokenService,
  private router: Router,
  private userService: UserService
){}
  
canActive(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
  const isTokenExpired = this.tokenService.isTokenExpired();
  const isUserIdValid = this.tokenService.getUserId()>0;
  this.userResponse = this.userService.getUserResponseFromLocalStorage();
  const isAdmin = this.userResponse?.role.name =='admin';
  if(!isTokenExpired && isUserIdValid &&isAdmin){
    return true;
  }else{
    this.router.navigate(['/login']);
    return false;
  }
}

}
export const AdminGuardFn: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean =>{
  return inject(AdminGuard).canActive(next,state);
}
