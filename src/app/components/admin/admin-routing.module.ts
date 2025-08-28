import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { ProductAdminComponent } from "./product/product.admin/product.admin.component";
import { OrderAdminComponent } from "./order/order.admin/order.admin.component";
import { DetailOrderComponent } from "./detail-order/detail-order.component";
import { InsertProductAdminComponent } from "./product/insert/insert.product.admin/insert.product.admin.component";
import { UpdateProductAdminComponent } from "./product/update/update.product.admin/update.product.admin.component";
import { QuantiyProductComponent } from "./product/update.quantity/quantiy.product/quantiy.product.component";
import { CategoriesComponent } from "./categories/categories.component";
import { UpdateCategoriesComponent } from "./categories/update.categories/update.categories.component";
import { InsertCategoriesComponent } from "./categories/insert.categories/insert.categories.component";
import { BrandsComponent } from "./brands/brands.component";
import { UpdateBrandComponent } from "./brands/update.brand/update.brand.component";
import { InsertBrandComponent } from "./brands/insert.brand/insert.brand.component";
import { StyleComponent } from "./style/style.component";
import { UpdateStyleComponent } from "./style/update.style/update.style.component";
import { InsertStyleComponent } from "./style/insert.style/insert.style.component";
import { MaterialComponent } from "./material/material.component";
import { UpdateMaterialComponent } from "./material/update.material/update.material.component";
import { InsertMaterialComponent } from "./material/insert.material/insert.material.component";
import { OriginComponent } from "./origin/origin.component";
import { UpdateOriginComponent } from "./origin/update.origin/update.origin.component";
import { InsertOriginComponent } from "./origin/insert.origin/insert.origin.component";
import { ColorComponent } from "./color/color.component";
import { UpdateColorComponent } from "./color/update.color/update.color.component";
import { InsertColorComponent } from "./color/insert.color/insert.color.component";
import { UserComponent } from "./user/user.component";
import { EmployeeComponent } from "./employee/employee.component";
import { UpdateEmployeeComponent } from "./employee/update.employee/update.employee.component";
import { InsertEmployeeComponent } from "./employee/insert.employee/insert.employee.component";

const routes: Routes =[
    {
        path: 'admin',
        component: AdminComponent,
        children: [
    {
                path: 'products',
                component: ProductAdminComponent
    },    {
                path: 'orders',
                component: OrderAdminComponent
            },
                {
                path: 'orders/:id',
                component: DetailOrderComponent
            },
              {
                path:'products/insert',
                component: InsertProductAdminComponent
            },
                  {
                path:'products/update/:id',
                component: UpdateProductAdminComponent
            },
              {
                path:'products/detail/:id',
                component: QuantiyProductComponent
            },
                     {
                path:'categories',
                component: CategoriesComponent
            },
            {
                path: 'categories/update/:id',
                component: UpdateCategoriesComponent
            },
            {
                  path:'categories/insert',
                component: InsertCategoriesComponent
            },
                      {
                path:'brands',
                component: BrandsComponent
            },
             {
                path: 'brand/update/:id',
                component: UpdateBrandComponent
            },
                    {
                path: 'brand/insert',
                component: InsertBrandComponent
            },
                       {
                path:'styles',
                component: StyleComponent
            },    
            {
                path: 'styles/update/:id',
                component: UpdateStyleComponent
            },
                    {
                path: 'styles/insert',
                component: InsertStyleComponent
            },
                         {
                path:'materials',
                component: MaterialComponent
            },  
                  {
                path: 'materials/update/:id',
                component: UpdateMaterialComponent
            },
                    {
                path: 'materials/insert',
                component: InsertMaterialComponent
            },
                             {
                path:'origins',
                component: OriginComponent
            },  
                  {
                path: 'origins/update/:id',
                component: UpdateOriginComponent
            },
                    {
                path: 'origins/insert',
                component: InsertOriginComponent
            },
                                {
                path:'colors',
                component: ColorComponent
            },  
                  {
                path: 'colors/update/:id',
                component: UpdateColorComponent
            },
                    {
                path: 'colors/insert',
                component: InsertColorComponent
            },{
                path: 'users',
                component: UserComponent
            },                                  {
                path:'employees',
                component: EmployeeComponent
            },  
                  {
                path: 'employees/update/:id',
                component: UpdateEmployeeComponent
            },
                    {
                path: 'employees/insert',
                component: InsertEmployeeComponent
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
export class AdminRoutingModule{}