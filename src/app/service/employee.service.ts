import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { employee } from 'src/model/employee';
import { EmployeeDto } from 'src/model/EmployeeDto';
import { CompanieNamesRequest } from 'src/model/CompaniesNamesRequest';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) {

  }

  url = environment.apiUrl;

  getAllEmployees(): Observable<employee> {
    return this.httpClient.get<employee>(this.url + "/employee")
  }

  getEmployeesPaginated(page: number): Observable<employee> {
    return this.httpClient.get<employee>(this.url + `/employee/page/${page}/2`)
  }

  //Get the employeesDto using pagination
  getEmployeesDtoPaginated(pageNo: number): Observable<EmployeeDto[]> {
    return this.httpClient.get<EmployeeDto[]>(this.url + `/employee/employeeDto/page/${pageNo}/10`)
  }

  //get the total of registers in Employees Table
  getCountEmployees(): Observable<number> {
    return this.httpClient.get<number>(this.url + "/employee/count")
  }

  //get all the copany names
  getCompanyNames(): Observable<CompanieNamesRequest> {
    return this.httpClient.get<CompanieNamesRequest>(this.url + '/company/getNameCompanies');
  }

  getChargesNames(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url + '/charge/getChargesNames');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  updateEmployeeDto(employeeDto: EmployeeDto): Promise<void> {

    const employJson = JSON.stringify(employeeDto);

    return new Promise<void>((resolve, reject) => {

      this.httpClient.put<any>(this.url + '/employee', employJson, this.httpOptions).subscribe(
        data => {
          resolve();
        },
        error => {
          reject(error);
        }

      );

    });
  

  }

}