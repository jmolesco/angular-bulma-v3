import { Injectable } from '@angular/core';
import { supplierInterface }  from './supplierInterface'
import { Observable } from 'rxjs';
import {environment} from '@environment/environment';
import { ServiceRequestCallService} from '@shared/shared.module'; 
import { authenticationInterface } from '@sharedInterfaces/authenticationInterface';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
//VARIABLES DECLARATION
url:string;
supplierUrl:string="suppliers";

constructor(private httpServiceRequest: ServiceRequestCallService) {    
  this.url = environment.url + this.supplierUrl;
 }

 public addSupplier(supplier:supplierInterface){
  let url:authenticationInterface = { 
      api_url:this.url,             
  }
  let response = this.httpServiceRequest.addResponseCall(url, supplier);
  return response;
}

public editSupplier(supplier:supplierInterface){
  let url:authenticationInterface = { 
      api_url:this.url+"/"+supplier.id,             
  }
  let response = this.httpServiceRequest.editResponseCall(url, supplier);
  return response;
}
public deleteSupplier(supplier:supplierInterface){
  let url:authenticationInterface = { 
      api_url:this.url+"/"+supplier.id,             
  }
  console.log(url);
  let response = this.httpServiceRequest.deleteResponseCall(url);
  return response;
}
public getAllSupplier(parameters):Observable<supplierInterface>{
  let url:authenticationInterface = { 
      api_url:this.url+"?currentpage="+parameters.currentPage+"&showall="+parameters.showAll,             
  }
  return this.httpServiceRequest.getResponseCall(url);
}
public getDetailViaIDSupplier(id:number):Observable<supplierInterface>{
  let url:authenticationInterface = { 
      api_url:this.url+"/"+id,             
  }
  return this.httpServiceRequest.getResponseCall(url);
}
}
