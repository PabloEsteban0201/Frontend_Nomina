import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { UserDto } from 'src/model/UserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  login(user:UserDto):Promise<HttpResponse<any>>{

    return new Promise<HttpResponse<any>>((resolve, reject) => {
      this.httpClient.post<HttpResponse<any>>(this.url+'/user',user,{headers:this.httpOptions.headers,observe: 'response'})
      .subscribe({
        next:(data)=>resolve(data),
        error:(error)=>reject(error)
      });
    });
  
  
  }



}
