import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { RequestLiquidationDto } from 'src/model/RequestLiquidationDto';
import { liquidateEmployeeDto } from 'src/model/LiquidateEmployeeDto';

@Injectable({
  providedIn: 'root'
})
export class LiquidationsService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  liquidateEmployees(requestLiquidationDto:RequestLiquidationDto[]):Promise<liquidateEmployeeDto[]>{

    return new Promise<liquidateEmployeeDto[]>((resolve, reject) => {
      this.httpClient.post<liquidateEmployeeDto[]>(this.url+"/liquidation",requestLiquidationDto,this.httpOptions).subscribe(
        {
          next:(data)=>resolve(data),
          error:(error)=>reject(error)
        }

      )
    });
    
  }


}
