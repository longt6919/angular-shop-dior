import { NgModule } from "@angular/core";
import { EmployeeComponent } from "./employee.component";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductEmployeeComponent } from './product.employee/product.employee.component';
import { DetailProductEmployeeComponent } from './detail-product-employee/detail-product-employee.component';
import { OrderEmployeeComponent } from './order-employee/order-employee.component';
import { ListOrdersEmployeeComponent } from './list-orders-employee/list-orders-employee.component';
import { DetailOrderEmployeeComponent } from './detail-order-employee/detail-order-employee.component';


@NgModule({
    declarations: [
        EmployeeComponent,
        ProductEmployeeComponent,
        DetailProductEmployeeComponent,
        OrderEmployeeComponent,
        ListOrdersEmployeeComponent,
        DetailOrderEmployeeComponent
    ],
    imports:[
        EmployeeRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class EmployeeModule{}