import { Component, OnInit } from '@angular/core';
import {SupplierService} from '../supplier.service';
import { supplierInterface }  from '../supplierInterface';
import { ActivatedRoute } from '@angular/router';
import { keywords } from '@shared/shared.module';
@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {

  //VARIABLE DECLARATION
  functionState:boolean = false;
  functionUsed:string=keywords.recordAdded;
  functionStatus:boolean = false;
  supplierDetail;
  supplierName:string;
  id:number;
  
  
  constructor(private httpService:SupplierService,
    private route:ActivatedRoute
    ) { 
      this.route.params.subscribe(params=>{
          const id = params['id'];
          if(id!=="new"){
             this.functionState = true;
             this.httpService.getDetailViaIDSupplier(id).subscribe(data=>
              {   
                 this.supplierDetail = data;
                 this.supplierName = this.supplierDetail.name;
                 this.id = this.supplierDetail.id;
                 this.functionUsed =keywords.recordEdited;
              } 
            );
          }
         
      });
  }


  ngOnInit(): void {
  }

  getInputData(){
    const data:supplierInterface = {
      id:this.id,
      name:this.supplierName.trim()
    }
    return data;
  }
  clearInput(){
    this.id=0;
    this.supplierName=" ";
  }
  functionDelay(time:number){
    setTimeout(()=>{  this.functionStatus = false; }, time );
  }
  submitInsertRecord(){
    const dataAdd = this.getInputData();
    this.httpService.addSupplier(dataAdd).subscribe(
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
    this.httpService.editSupplier(dataEdit).subscribe(
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
