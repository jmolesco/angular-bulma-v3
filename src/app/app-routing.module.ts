import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '@dashboard/dashboard.component';
//import { PagesModule } from '@pages/category/category.module';
import { CategoryModule } from '@pages/category/category.module';
import { ManufacturerModule } from '@pages/manufacturer/manufacturer.module';
import { SupplierModule } from '@pages/supplier/supplier.module';

const routes: Routes = [
  {
    path:"",
    component: DashboardComponent,
    pathMatch:"full"
  },
  {
    path:"category",
    loadChildren:()=> import("@pages/pages.module").then(m=>CategoryModule)
  },
  {
    path:"manufacturer",
    loadChildren:()=> import("@pages/pages.module").then(m=>ManufacturerModule)
  },
  {
    path:"supplier",
    loadChildren:()=> import("@pages/pages.module").then(m=>SupplierModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
