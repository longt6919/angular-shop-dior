import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
 userResponse?:UserResponse | null;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
  ) { }
    ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
      const url = this.router.url;
  const isEmployeeRoot = url === '/employee' || url === '/employee/';
  if (isEmployeeRoot) {
    this.router.navigate(['/employee/orders']);
  }}
  
  logout() {
this.userService.removeUserFromLocalStorage();
this.tokenService.removeToken();
this.userResponse = this.userService.getUserResponseFromLocalStorage();
this.router.navigate(['/'])
}
}
