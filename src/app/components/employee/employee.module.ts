import { NgModule } from "@angular/core";
import { EmployeeComponent } from "./employee.component";
import { AdminRoutingModule } from "./employee-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductEmployeeComponent } from './product.employee/product.employee.component';


@NgModule({
    declarations: [
        EmployeeComponent,
        ProductEmployeeComponent
    ],
    imports:[
        AdminRoutingModule,
        CommonModule,
        FormsModule
    ]
})
export class AdminModule{}