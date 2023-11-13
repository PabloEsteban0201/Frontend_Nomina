import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Injectable } from '@angular/core';
import { EmployeeDto } from 'src/model/EmployeeDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailableEmployeesService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl;

  getPaginatedAvailableEmployeesDto(pageNo:number,pageSize:number):Promise<EmployeeDto[]>{

    return new Promise<EmployeeDto[]>((resolve, reject) => {
      this.httpClient.get<EmployeeDto[]>(this.url+`/employee/availableEmployeesDto/page/${pageNo}/${pageSize}`).subscribe(
        {
          next:(data)=>resolve(data),
          error:(error)=>reject(error)
        }

      )
    });
    
  }

  //get the total of registers in Employees Table
  getCountEmployees():Promise<number>{

    return new Promise<number>((resolve, reject) => {
      this.httpClient.get<number>(this.url + "/employee/countAvialableEmployees").subscribe(
        {
          next:(data)=>resolve(data),
          error:(error)=>reject(error)
        }

      )
    });
  }

}
