import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {SupplierService} from '../supplier.service';
import {  ServiceFunctionCallService} from '@shared/shared.module'; 
import { supplierInterface }  from '../supplierInterface';
@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {

  clickEventsubscription:Subscription;

  constructor(private httpService:SupplierService,
    private httpSharedService:ServiceFunctionCallService
    ) { 
      if(this.httpSharedService.subsVar!==undefined){
        this.httpSharedService.subsVar = undefined;
      }
  }

  //VARIABLES
  supplierList;
  totalPageList:number=0;
  currentPage:number = 1;
  showAll:boolean = false;
  

  ngOnInit(): void {
    this.recordListLoader(this.currentPage, this.showAll);
    if (this.httpSharedService.subsVar==undefined) 
    {    
      this.httpSharedService.subsVar = this.httpSharedService.invokeFirstComponentFunction.subscribe((currentPage:number) => {    
        this.currentPage = currentPage; 
        this.recordListLoader(this.currentPage, this.showAll)
      });    
    }
  }
  recordListLoader(currentPage, showAll):void{
    let parameters = {
      currentPage:currentPage,
      showAll:showAll
    }
    this.httpService.getAllSupplier(parameters).subscribe(data=>
      {   
         this.supplierList = data['list'];
         this.totalPageList = data["totalPage"]
      } 
    );
  }
 
  submitDeleteRecord(id:number):void{
    const dataDelete:supplierInterface = {
      id:id,
      name:""
    }
    this.httpService.deleteSupplier(dataDelete).subscribe(
      success => { 
        alert('Done');
        this.recordListLoader(this.currentPage, this.showAll)
      },
      error =>  { 
        console.log(error) 
      } 
    );
  }
}
