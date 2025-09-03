import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeComponent } from "./employee.component";
import { ProductEmployeeComponent } from "./product.employee/product.employee.component";
import { DetailProductEmployeeComponent } from "./detail-product-employee/detail-product-employee.component";
import { OrderAdminComponent } from "../admin/order/order.admin/order.admin.component";
import { EmployeeGuardFn } from "src/app/guards/employee.guard";
import { OrderEmployeeComponent } from "./order-employee/order-employee.component";
import { ListOrdersEmployeeComponent } from "./list-orders-employee/list-orders-employee.component";
import { DetailOrderEmployeeComponent } from "./detail-order-employee/detail-order-employee.component";


const routes: Routes =[
    {
        path: 'employee',
        component: EmployeeComponent,
        children: [
        {
            path: 'products',
            component: ProductEmployeeComponent,canActivate:[EmployeeGuardFn]
        },   
        {
            path:'products/:id', 
            component: DetailProductEmployeeComponent,canActivate:[EmployeeGuardFn]
        },
            {
            path:'orders', 
            component: OrderEmployeeComponent,canActivate:[EmployeeGuardFn]
            },
               {
            path: 'list-orders',
            component: ListOrdersEmployeeComponent,canActivate:[EmployeeGuardFn]
        },
        {
            path: 'orders/:id',
            component: DetailOrderEmployeeComponent,canActivate:[EmployeeGuardFn]
        },
        ]
    }
];
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export class EmployeeRoutingModule{}