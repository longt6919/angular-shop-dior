import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeComponent } from "./employee.component";


const routes: Routes =[
    {
        path: 'employee',
        component: EmployeeComponent,
        children: [
 
                
        ]
    }
];
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export class AdminRoutingModule{}