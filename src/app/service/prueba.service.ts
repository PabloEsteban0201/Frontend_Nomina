import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { employee } from 'src/model/employee';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private httpClient:HttpClient) {
    
  }

  url = environment.apiUrl;

  getAllEmployees():Observable<employee>{
    return this.httpClient.get<employee>(this.url+"/employee")
  }

  getEmployeesPaginated(page:number):Observable<employee>{
    return this.httpClient.get<employee>(this.url+ `/employee/page/${page}/2`)
  }


}
