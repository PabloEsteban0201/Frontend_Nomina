import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { RequestLiquidationDto } from 'src/model/RequestLiquidationDto';
import { liquidateEmployeeDto } from 'src/model/LiquidateEmployeeDto';
import { Company } from 'src/model/Company';
import { Charge } from 'src/model/Charge';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getCompanies():Promise<Company[]>{

    return new Promise<Company[]>((resolve, reject) => {
      this.httpClient.get<Company[]>(this.url+"/company/getAllCompanies").subscribe(
        {
          next:(data)=>resolve(data),
          error:(error)=>reject(error)
        }

      )
    });
    
  }

  getCharges():Promise<Charge[]>{

    return new Promise<Charge[]>((resolve, reject) => {
      this.httpClient.get<Charge[]>(this.url+"/charge/getAllCharges").subscribe(
        {
          next:(data)=>resolve(data),
          error:(error)=>reject(error)
        }

      )
    });
    
  }

}
