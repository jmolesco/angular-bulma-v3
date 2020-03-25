import { Injectable } from '@angular/core';
import { categoryInterface }  from './categoryInterface'
import { Observable } from 'rxjs';
import {environment} from '@environment/environment';
import { ServiceRequestCallService} from '@shared/shared.module'; 
import { authenticationInterface } from '@sharedInterfaces/authenticationInterface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //VARIABLES DECLARATION
  url:string;
  categoryUrl:string="categories";
  
  constructor(private httpServiceRequest: ServiceRequestCallService) {    
    this.url = environment.url + this.categoryUrl;
   }

   public addCategory(category:categoryInterface){
    let url:authenticationInterface = { 
        api_url:this.url,             
    }
    let response = this.httpServiceRequest.addResponseCall(url, category);
    return response;
  }

  public editCategory(category:categoryInterface){
    let url:authenticationInterface = { 
        api_url:this.url+"/"+category.id,             
    }
    let response = this.httpServiceRequest.editResponseCall(url, category);
    return response;
  }
  public getAllCategory(parameters):Observable<categoryInterface>{
    let url:authenticationInterface = { 
        api_url:this.url+"?currentpage="+parameters.currentPage+"&showall="+parameters.showAll,             
    }
    return this.httpServiceRequest.getResponseCall(url);
  }
}
