import { Component } from '@angular/core';
import { ReportPaymentDto } from 'src/model/ReportPaymentDto';
import { DataSharedService } from '../service/data-shared.service';
import { Router } from '@angular/router';
import { PaymentDetailsDto } from 'src/model/PaymentDetailsDto';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-detail-payment',
  templateUrl: './detail-payment.component.html',
  styleUrls: ['./detail-payment.component.css']
})
export class DetailPaymentComponent {

  //Data to show in table
  detailsPayments:ReportPaymentDto[]=[];

  //Dialog details
  detailsDialog:boolean=false;

  //payment to get the details
  paymentToGetDetails!:ReportPaymentDto;

  //payment concepts to show
  paymentConcepts!:PaymentDetailsDto;

  constructor(private dataService:DataSharedService, private route:Router, private paymentService:PaymentService){

  }

  ngOnInit(){

    this.detailsPayments=this.dataService.reportedPayments;

  }

  consultDetailsPayment(payment:ReportPaymentDto){
    this.paymentToGetDetails={...payment};

    this.paymentService.getDetailsPayment(payment.paymentId).subscribe((data:PaymentDetailsDto)=>{
      this.paymentConcepts=data;
    });

    this.detailsDialog=true;

  }

  hideDialog(){
    this.detailsDialog=false;
  }

  exit(){
    this.route.navigate(['/home']);
  }

}
