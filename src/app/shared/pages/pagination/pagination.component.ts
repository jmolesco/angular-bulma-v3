import { Component, OnInit, Input } from '@angular/core';
import { ServiceFunctionCallService} from '@sharedServices/service-function-call.service'; 
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

 //VARIABLES DECLARATION
 list = new Array();
 pageList = new Array();
 pageListWordings = new Array();
 currentPage:number = 0;
 numberPerPage:number = 0;
 numberOfPage:number =0;
 previousState:boolean = false;
 nextState:boolean = false;
 isCurrent:string;
 classState:string;
 currentKey:string = "current_key_";
 comparerKey:string = "current_key_";
 constructor(private httpSharedService:ServiceFunctionCallService) { 
   this.currentPage = 1;
   this.numberPerPage= 10;
   this.numberOfPage =0; 
 }

   
 @Input()
 paginationTotal:string

 createlist(totalItems):void{

   for(var  i=1; i <= totalItems;i++){
     this.list.push(i);
     let currentKey = this.currentKey+i;
     this.pageListWordings.push(currentKey); 
   }
 }

 generateNumberofPage():number{
   return Math.ceil(this.list.length / this.numberPerPage);
 }

 nextPage():void{
   this.currentPage += 1;
   this.loadList();
 }

 previousPage():void{
   this.currentPage -= 1;
   this.loadList();
 }
 
 loadList():void{
   let begin = ((this.currentPage - 1) * this.numberPerPage);
   let end = begin + this.numberPerPage;
   this.pageList  = this.list.slice(begin, end);
   this.check();
 }
 check():void{

   this.previousState = this.currentPage === 1?true:false;
   this.nextState = this.currentPage === this.numberOfPage?true:false;   
   
}


  //Next Page
  submitRequestPage(id):void{
    this.httpSharedService.sendNextPage(id);
  }

 ngOnInit(): void {
   this.createlist(parseInt(this.paginationTotal));
   this.numberOfPage = this.generateNumberofPage();
   this.loadList();
 }


}
