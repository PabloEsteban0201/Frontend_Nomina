import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentDetailsDto } from 'src/model/PaymentDetailsDto';
import { catchError } from 'rxjs';
import { PaymentHistoryService } from '../service/payment-history.service';
import { EmployeeDto } from 'src/model/EmployeeDto';
import { DataSharedService } from '../service/data-shared.service';


@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent {

  //To show in the table
  payments: PaymentDetailsDto[] = [];

  employee!:EmployeeDto;

  constructor(private paymentHistoryService: PaymentHistoryService, private router: Router,private dataService:DataSharedService) {

  }

  async ngOnInit() {
    
    this.employee=this.dataService.employeePaymentHistory;

    try {
      await this.paymentHistoryService.getPaymentHistory(123).then(
        (data: PaymentDetailsDto[]) => {
          this.payments = data;
        });
    } catch (error) {

      console.log("Se obtuvo un error");
    }


  }
}
