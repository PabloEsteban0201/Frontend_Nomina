import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentDetailsDto } from 'src/model/PaymentDetailsDto';
import { catchError } from 'rxjs';
import { PaymentHistoryService } from '../service/payment-history.service';
import { EmployeeDto } from 'src/model/EmployeeDto';
import { DataSharedService } from '../service/data-shared.service';
import {saveAs} from "file-saver";



@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent {

  //To show in the table
  payments: PaymentDetailsDto[] = [];

  //Data entry
  employee!:EmployeeDto;

  //details payment button
  detailsDialog:boolean =false; 

  //payment to consult payment details
  paymentDetails!: PaymentDetailsDto;

  constructor(private paymentHistoryService: PaymentHistoryService, private router: Router,private dataService:DataSharedService) {

  }

  async ngOnInit() {
    
    this.employee=this.dataService.employeePaymentHistory;

    try {
      await this.paymentHistoryService.getPaymentHistory(this.employee.personalNumber).then(
        (data: PaymentDetailsDto[]) => {
          this.payments = data;
        });
    } catch (error) {

      console.log("Se obtuvo un error");
      this.payments=[];
    }


  }

  consultDetailsPayment(paymentDetails:PaymentDetailsDto){

    this.paymentDetails={...paymentDetails};
    this.detailsDialog=true;
  }

  hideDialog(){
    this.detailsDialog=false;
  }

  downloadCSV(){
    const csvContent = this.convertToCSV(this.payments);

    // Con file-saver
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    saveAs(blob, 'pagos'+this.employee.lastname+this.employee.lastname+'.csv');

  }

  convertToCSV(payments: PaymentDetailsDto[]): string {

    const separador = ',';
    const cabeceras = Object.keys(payments[0]).join(separador);

    const filas = payments.map(objeto => {
      return Object.values(objeto).map(valor => JSON.stringify(valor)).join(separador);
    });

    return cabeceras + '\n' + filas.join('\n');
  }


}
