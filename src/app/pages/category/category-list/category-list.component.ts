import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {CategoryService} from '../category.service';
import {  ServiceFunctionCallService} from '@shared/shared.module'; 
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
  }

  //VARIABLES
  categoryList;
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
    this.httpService.getAllCategory(parameters).subscribe(data=>
      {   
         this.categoryList = data['list'];
         this.totalPageList = data["totalPage"]
      } 
    );
  }

}
