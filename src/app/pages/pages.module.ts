import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryModule}from '@category/category.module';
import {ManufacturerModule}from '@manufacturer/manufacturer.module';
import {SupplierModule}from '@supplier/supplier.module';
import { DashboardComponent } from './dashboard/dashboard.component';




@NgModule({
  declarations: [DashboardComponent],
  exports: [
    CategoryModule,
    ManufacturerModule,
    SupplierModule
  ],
  imports: [
    CommonModule,
    CategoryModule,
    ManufacturerModule,
    SupplierModule
  ]
})
export class PagesModule { }
