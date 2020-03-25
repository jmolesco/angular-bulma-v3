import { Injectable, EventEmitter } from '@angular/core';
import { Subscription  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceFunctionCallService {

  constructor() { }

  currentPage:number =0;
  showAll:boolean = false;

  invokeFirstComponentFunction = new EventEmitter();    
  subsVar: Subscription;    


  sendNextPage(currentPage):void{
    this.invokeFirstComponentFunction.emit(currentPage);
  }
}
