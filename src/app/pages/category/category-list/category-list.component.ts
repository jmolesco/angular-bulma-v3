import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {CategoryService} from '../category.service';
import {  ServiceFunctionCallService} from '@shared/shared.module'; 
import { categoryInterface }  from '../categoryInterface';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  
  clickEventsubscription:Subscription;

  constructor(private httpService:CategoryService,
    private httpSharedService:ServiceFunctionCallService
    ) { 
      if(this.httpSharedService.subsVar!==undefined){
        this.httpSharedService.subsVar = undefined;
      }
  }

  //VARIABLES
  categoryList;
  totalPageList:number=0;
  currentPage:number = 1;
  showAll:boolean = false;
  

  ngOnInit(): void {
    this.recordListLoader(this.currentPage, this.showAll);
    console.log("category : " );
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
    this.httpService.getAllCategory(parameters).subscribe(data=>
      {   
         this.categoryList = data['list'];
         this.totalPageList = data["totalPage"]
      } 
    );
  }
 
  submitDeleteRecord(id:number):void{
    const dataDelete:categoryInterface = {
      id:id,
      name:""
    }
    this.httpService.deleteCategory(dataDelete).subscribe(
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
