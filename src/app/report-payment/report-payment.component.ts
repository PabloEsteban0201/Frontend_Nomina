import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaymentService } from '../service/payment.service';
import { Charge } from 'src/model/Charge';
import { Company } from 'src/model/Company';

@Component({
  selector: 'app-report-payment',
  templateUrl: './report-payment.component.html',
  styleUrls: ['./report-payment.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ReportPaymentComponent {

  //Charges
  charges:Charge[]=[];
  companies:Company[]=[];

  constructor(private paymentService:PaymentService,  private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService){

  }

  async ngOnInit(){
    await this.chargeCompaniesCharges();
    console.log(this.charges);
  }

  async chargeCompaniesCharges(){
    try{
      await this.paymentService.getCharges().then((data:Charge[])=>
      {
        this.charges=data;
      });
      await this.paymentService.getCompanies().then((data:Company[])=>
      {
        this.companies=data;
      });

    }catch(error){
      console.log("Se obtuvo el siguiente error en chargeCompaniesCharges:" ,error)
    }

  }

}
