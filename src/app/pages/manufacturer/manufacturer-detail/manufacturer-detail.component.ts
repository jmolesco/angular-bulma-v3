import { Component, OnInit } from '@angular/core';
import { manufacturerInterface }  from '../manufacturerInterface';
import { Subscription } from 'rxjs';
import {ManufacturerService} from '../manufacturer.service';
import {  ServiceFunctionCallService} from '@shared/shared.module'; 
import { ActivatedRoute } from '@angular/router';
import { keywords } from '@shared/shared.module';
@Component({
  selector: 'app-manufacturer-detail',
  templateUrl: './manufacturer-detail.component.html',
  styleUrls: ['./manufacturer-detail.component.scss']
})
export class ManufacturerDetailComponent implements OnInit {


   //VARIABLE DECLARATION
   functionState:boolean = false;
   functionUsed:string=keywords.recordAdded;
   functionStatus:boolean = false;
   manufacturerDetail;
   manufacturerName:string;
   id:number;

constructor(private httpService:ManufacturerService,
    private route:ActivatedRoute
    ) { 
      this.route.params.subscribe(params=>{
          const id = params['id'];
          if(id!=="new"){
             this.functionState = true;
             this.httpService.getDetailViaIDManufacturer(id).subscribe(data=>
              {   
                 this.manufacturerDetail = data;
                 this.manufacturerName = this.manufacturerDetail.name;
                 this.id = this.manufacturerDetail.id;
                 this.functionUsed =keywords.recordEdited;
              } 
            );
          }
         
      });
  }


  ngOnInit(): void {
  }

  getInputData(){
    const data:manufacturerInterface = {
      id:this.id,
      name:this.manufacturerName.trim()
    }
    return data;
  }
  clearInput(){
    this.id=0;
    this.manufacturerName=" ";
  }
  functionDelay(time:number){
    setTimeout(()=>{  this.functionStatus = false; }, time );
  }
  submitInsertRecord(){
    const dataAdd = this.getInputData();
    this.httpService.addManufacturer(dataAdd).subscribe(
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
    this.httpService.editManufacturer(dataEdit).subscribe(
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
