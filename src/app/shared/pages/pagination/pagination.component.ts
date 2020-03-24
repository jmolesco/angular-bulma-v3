import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

 //VARIABLES DECLARATION
 list = new Array();
 pageList = new Array();
 currentPage:number = 0;
 numberPerPage:number = 0;
 numberOfPage:number =0;
 
 constructor() { 
   this.currentPage = 1;
   this.numberPerPage= 10;
   this.numberOfPage =0;

 }

   
 @Input()
 paginationTotal:string

 createlist(totalItems):void{
   for(var  i=1; i <= 102;i++){
     this.list.push(i);
   }
 }

 generateNumberofPage():number{
   return Math.ceil(this.list.length / this.numberPerPage);
 }

 nextPage():void{
   this.currentPage += 1;
   //console.log("Current Page : " + this.currentPage);
   this.loadList();
 }

 previousPage():void{
   this.currentPage -= 1;
   this.loadList();
 }
 
 loadList():void{
   let begin = ((this.currentPage - 1) * this.numberPerPage);
   //console.log("Begin : " + begin);
   let end = begin + this.numberPerPage;
   // console.log("End : " + end);
   // if(begin < 0)
   // {
   //  begin = 0;
   //  end = this.numberOfPage;   
   // }else{
     this.pageList  = this.list.slice(begin, end);
     //this.drawlist();

  // }

 }
 // drawlist():void{
 //   for(let i=0; i < this.pageList.length; i++){
 //     console.log(this.pageList[i]);
 //   }
 // }

 ngOnInit(): void {
   this.createlist(parseInt(this.paginationTotal));
   this.numberOfPage = this.generateNumberofPage();
   this.loadList();
 }


}
