import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {CategoryService} from '../category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  
  clickEventsubscription:Subscription;

  constructor(private httpService:CategoryService, ) { 
  }

  //VARIABLES
  categoryList;
  totalPageList:number=0;
  parameters:object ={
    currentPage:1,
    showAll:false
  };


  ngOnInit(): void {
    this.recordListLoader();
  }
  recordListLoader():void{
    console.log(this.parameters);
    this.httpService.getAllCategory(this.parameters).subscribe(data=>
      {   
         this.categoryList = data['list'];
         this.totalPageList = data["totalPage"]
      } 
    );
  }

}
