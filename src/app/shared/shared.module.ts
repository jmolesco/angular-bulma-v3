import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesModule} from '@sharedPages/pages.module';

@NgModule({
  declarations: [],
  exports:[PagesModule],
  imports: [
    CommonModule,
    PagesModule,
  ]
})
export class SharedModule { }
export { ServiceFunctionCallService } from './services/service-function-call.service'
export { ServiceRequestCallService } from './services/service-request-call.service'
