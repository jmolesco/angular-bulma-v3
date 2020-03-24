import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HeaderComponent, FooterComponent, PaginationComponent],
  exports: [HeaderComponent, FooterComponent, PaginationComponent],

})
export class PagesModule { }
