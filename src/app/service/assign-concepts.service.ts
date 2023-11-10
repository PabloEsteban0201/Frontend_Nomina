import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { BenefitsLicensesDto } from 'src/model/BenefitsLicensesDto';
import { RequestLiquidationDto } from 'src/model/RequestLiquidationDto';

@Injectable({
  providedIn: 'root'
})
export class AssignConceptsService {

  constructor(private httpClient: HttpClient) { 

  }

  url = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAllBenefits(): Promise<string[]>{

    return new Promise<string[]>((resolve, reject) => {

      this.httpClient.get<string[]>(this.url + "/typeConcept/getBenefits").subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }

      );

    });

  }

  getAllLicenses(): Promise<string[]>{

    return new Promise<string[]>((resolve, reject) => {

      this.httpClient.get<string[]>(this.url + "/typeConcept/getLicenses").subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }

      );

    });

  }

  getAllTaxes(): Promise<string[]>{

    return new Promise<string[]>((resolve, reject) => {

      this.httpClient.get<string[]>(this.url + "/typeConcept/getTaxes").subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }

      );

    });

  }

  getAllRetentions(): Promise<string[]>{

    return new Promise<string[]>((resolve, reject) => {

      this.httpClient.get<string[]>(this.url + "/typeConcept/getRetentions").subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }

      );

    });

  }

  liquidateEmployees(requestConcepts:BenefitsLicensesDto[]):Promise<RequestLiquidationDto[]>{

    return new Promise<RequestLiquidationDto[]>((resolve, reject) => {
      this.httpClient.post<RequestLiquidationDto[]>(this.url+"/assign",requestConcepts,this.httpOptions).subscribe(
        {
          next:(data)=>resolve(data),
          error:(error)=>reject(error)
        }

      )
    });
    
  }


}
