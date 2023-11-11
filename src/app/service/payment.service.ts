import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { RequestLiquidationDto } from 'src/model/RequestLiquidationDto';
import { liquidateEmployeeDto } from 'src/model/LiquidateEmployeeDto';
import { Company } from 'src/model/Company';
import { Charge } from 'src/model/Charge';
import { EmployeeReportDto } from 'src/model/EmployeeReportDto';
import { TypePeriod } from 'src/model/TypePeriod';
import { ReportPaymentDto } from 'src/model/ReportPaymentDto';
import { PaymentEmployeeDto } from 'src/model/PaymentEmployeeDto';

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

  getEmployeesPayedByCompany(companyId:number):Promise<EmployeeReportDto[]>{
    return new Promise<EmployeeReportDto[]>((resolve, reject) => {
      this.httpClient.get<EmployeeReportDto[]>(this.url+`/employee/employeesPayed/${companyId}`).subscribe(
        {
          next:(data)=>resolve(data),
          error:(error)=>reject(error.status)
        }

      )
    });
  }

  getEmployeesPayedByCompanyAndCharge(companyId:number, chargeId:number):Promise<EmployeeReportDto[]>{
    return new Promise<EmployeeReportDto[]>((resolve, reject) => {
      this.httpClient.get<EmployeeReportDto[]>(this.url+`/employee/employeesPayed/${companyId}/${chargeId}`).subscribe(
        {
          next:(data)=>resolve(data),
          error:(error)=>reject(error.status)
        }

      )
    });
  }

  getPeriods():Promise<TypePeriod[]>{

    return new Promise<TypePeriod[]>((resolve, reject) => {
      this.httpClient.get<TypePeriod[]>(this.url+'/period/getAllPeriods').subscribe(
        {
          next:(data)=>resolve(data),
          error:(error)=>reject(error)
        }

      )
    });
  }

  reportPayments(employeesToReport:PaymentEmployeeDto):Promise<ReportPaymentDto[]>{

    return new Promise<ReportPaymentDto[]>((resolve, reject) => {
      this.httpClient.post<ReportPaymentDto[]>(this.url+'/payment',employeesToReport,this.httpOptions).subscribe(
        {
          next:(data)=>resolve(data),
          error:(error)=>reject(error)
        }

      )
    });
  }


}
