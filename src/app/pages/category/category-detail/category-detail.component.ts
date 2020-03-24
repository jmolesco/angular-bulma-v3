import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../category.service';
import { categoryInterface }  from '../categoryInterface';
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  constructor(private httpService:CategoryService, ) { 
  }

  categoryName:string;
  id:number;
  
  ngOnInit(): void {
  }

  submitInsertRecord(){
    const data:categoryInterface = {
      name: this.categoryName
    };
    console.log(data);
    this.httpService.addCategory(data).subscribe(
      success => { 
        alert("Done") 
      },
      error => console.log(error)
    );
  }
}
