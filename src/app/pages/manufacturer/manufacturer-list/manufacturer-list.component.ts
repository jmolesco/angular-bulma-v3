import { Component, OnInit } from '@angular/core';
import { manufacturerInterface }  from '../manufacturerInterface';
import { Subscription } from 'rxjs';
import {ManufacturerService} from '../manufacturer.service';
import {  ServiceFunctionCallService} from '@shared/shared.module'; 
@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss']
})
export class ManufacturerListComponent implements OnInit {

  clickEventsubscription:Subscription;

  constructor(private httpService:ManufacturerService,
    private httpSharedService:ServiceFunctionCallService
    ) { 
      if(this.httpSharedService.subsVar!==undefined){
        this.httpSharedService.subsVar = undefined;
      }
  }


  //VARIABLES
  manufacturerList;
  totalPageList:number=0;
  currentPage:number = 1;
  showAll:boolean = false;
  

  ngOnInit(): void {
    this.recordListLoader(this.currentPage, this.showAll);
    console.log("manufacturer : " );
    console.log(this.httpSharedService.subsVar);
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
    this.httpService.getAllManufacturer(parameters).subscribe(data=>
      {   
         this.manufacturerList = data['list'];
         this.totalPageList = data["totalPage"]
      } 
    );
  }
 
  submitDeleteRecord(id:number):void{
    const dataDelete:manufacturerInterface = {
      id:id,
      name:""
    }
    this.httpService.deleteManufacturer(dataDelete).subscribe(
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
