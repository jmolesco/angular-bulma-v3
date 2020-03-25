import { Injectable } from '@angular/core';
import { manufacturerInterface }  from './manufacturerInterface'
import { Observable } from 'rxjs';
import {environment} from '@environment/environment';
import { ServiceRequestCallService} from '@shared/shared.module'; 
import { authenticationInterface } from '@sharedInterfaces/authenticationInterface';
@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  //VARIABLES DECLARATION
  url:string;
  categoryUrl:string="manufacturers";
  
  constructor(private httpServiceRequest: ServiceRequestCallService) {    
    this.url = environment.url + this.categoryUrl;
   }

   public addManufacturer(manufacturer:manufacturerInterface){
    let url:authenticationInterface = { 
        api_url:this.url,             
    }
    let response = this.httpServiceRequest.addResponseCall(url, manufacturer);
    return response;
  }

  public editManufacturer(manufacturer:manufacturerInterface){
    let url:authenticationInterface = { 
        api_url:this.url+"/"+manufacturer.id,             
    }
    let response = this.httpServiceRequest.editResponseCall(url, manufacturer);
    return response;
  }
  public deleteManufacturer(manufacturer:manufacturerInterface){
    let url:authenticationInterface = { 
        api_url:this.url+"/"+manufacturer.id,             
    }
    let response = this.httpServiceRequest.deleteResponseCall(url);
    return response;
  }
  public getAllManufacturer(parameters):Observable<manufacturerInterface>{
    let url:authenticationInterface = { 
        api_url:this.url+"?currentpage="+parameters.currentPage+"&showall="+parameters.showAll,             
    }
    return this.httpServiceRequest.getResponseCall(url);
  }
  public getDetailViaIDManufacturer(id:number):Observable<manufacturerInterface>{
    let url:authenticationInterface = { 
        api_url:this.url+"/"+id,             
    }
    return this.httpServiceRequest.getResponseCall(url);
  }
}
