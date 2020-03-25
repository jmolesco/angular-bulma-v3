import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../category.service';
import { categoryInterface }  from '../categoryInterface';
import { ActivatedRoute } from '@angular/router';
import { keywords } from '@shared/shared.module';
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  
  //VARIABLE DECLARATION
  functionState:boolean = false;
  functionUsed:string=keywords.recordAdded;
  functionStatus:boolean = false;
  categoryDetail;
  categoryName:string;
  id:number;
  
  
  constructor(private httpService:CategoryService,
    private route:ActivatedRoute
    ) { 
      this.route.params.subscribe(params=>{
          const id = params['id'];
          if(id!=="new"){
             this.functionState = true;
             this.httpService.getDetailViaIDCategory(id).subscribe(data=>
              {   
                 this.categoryDetail = data;
                 this.categoryName = this.categoryDetail.name;
                 this.id = this.categoryDetail.id;
                 this.functionUsed =keywords.recordEdited;
              } 
            );
          }
         
      });
  }


  ngOnInit(): void {
  }

  getInputData(){
    const data:categoryInterface = {
      id:this.id,
      name:this.categoryName.trim()
    }
    return data;
  }
  clearInput(){
    this.id=0;
    this.categoryName=" ";
  }
  functionDelay(time:number){
    setTimeout(()=>{  this.functionStatus = false; }, time );
  }
  submitInsertRecord(){
    const dataAdd = this.getInputData();
    this.httpService.addCategory(dataAdd).subscribe(
      success => { 
        this.clearInput();
        this.functionStatus = true;
        this.functionDelay(keywords.delayTime);
      },
      error =>  { 
        console.log(error) 
        this.functionStatus = false;
      } 
    );
  }
  submitEditRecord():void{
    const dataEdit = this.getInputData();
    this.httpService.editCategory(dataEdit).subscribe(
      success => { 
        this.functionStatus = true;
        this.functionDelay(keywords.delayTime);
      },
      error =>  { 
        console.log(error) 
        this.functionStatus = false;
      } 
    );
  }
}
