import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { PaymentDetailsDto } from 'src/model/PaymentDetailsDto';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  //How to get the errors in a better way
  getPaymentHistory(personalNumber:number): Promise<PaymentDetailsDto[]>{

    return new Promise<PaymentDetailsDto[]>((resolve, reject) => {
      this.httpClient.get<PaymentDetailsDto[]>(this.url + `/payment/detailPayments/${personalNumber}`)
        .pipe(
          catchError((error) => {
            if (error.status === 404) {
              reject('La solicitud no pudo ser encontrada (404).');
            } else {
              // Puedes manejar otros códigos de error aquí según sea necesario
              reject(`Error desconocido: ${error.status}`);
            }
  
            // Propaga el error para que pueda ser manejado por el código que llama a la función
            return throwError(() => error);
          })
        )
        .subscribe((data) => resolve(data));
    });

  }


  


}
