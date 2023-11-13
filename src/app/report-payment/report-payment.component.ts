import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaymentService } from '../service/payment.service';
import { Charge } from 'src/model/Charge';
import { Company } from 'src/model/Company';
import { EmployeeReportDto } from 'src/model/EmployeeReportDto';
import { TypePeriod } from 'src/model/TypePeriod';
import { ReportPaymentDto } from 'src/model/ReportPaymentDto';
import { PaymentEmployeeDto } from 'src/model/PaymentEmployeeDto';
import { DataSharedService } from '../service/data-shared.service';
import { PaymentDetailsDto } from 'src/model/PaymentDetailsDto';


@Component({
  selector: 'app-report-payment',
  templateUrl: './report-payment.component.html',
  styleUrls: ['./report-payment.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ReportPaymentComponent {

  //Info static
  charges: Charge[] = [];
  companies: Company[] = [];
  periods: TypePeriod[] = [];

  //For the dropdown selected option
  selectedCompany!: Company;
  selectedCharge!: Charge;
  selectedPeriod!: TypePeriod;

  //To show in the table
  employeesPayed: EmployeeReportDto[] = [];

  //To select in employees
  selectedEmployees: EmployeeReportDto[] = [];

  //Data to send in the endpoint
  employeesToReport: PaymentEmployeeDto = { personalNumbers: [], codePeriod: '' };

  //To get the payments reported
  paymentsReported: ReportPaymentDto[] = [];

  //Report button
  enableReport: boolean = true;

  //details payment button
  detailsDialog:boolean =false; 

  //payment to consult payment details
  paymentDetails!: PaymentDetailsDto;

  

  constructor(private dataService:DataSharedService,private paymentService: PaymentService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  async ngOnInit() {
    await this.getCompaniesChargesPeriods();


  }

  async getCompaniesChargesPeriods() {
    try {
      await this.paymentService.getCharges().then((data: Charge[]) => {
        this.charges = data;
      });
      await this.paymentService.getCompanies().then((data: Company[]) => {
        this.companies = data;
      });
      await this.paymentService.getPeriods().then((data: TypePeriod[]) => {
        this.periods = data;
      });

    } catch (error) {
      console.log("Se obtuvo el siguiente error en chargeCompaniesCharges:", error)
    }

  }


  async findEmployees() {
    this.selectedEmployees = [];
    

    if (this.selectedCompany !== null && this.selectedCompany !== undefined) {
      if (this.selectedCharge === null || this.selectedCharge === undefined) {
        console.log("selecciono solo empresa");

        try {
          await this.paymentService.getEmployeesPayedByCompany(this.selectedCompany.companyId).then(
            (data: EmployeeReportDto[]) => {
              this.employeesPayed = data;
            }
          );

        } catch (error) {
          console.log("Error en findEmployees line 96: ", error);
          
          
        }
      }
    } else {

      this.messageService.add(
        {
          severity: 'error',
          summary: 'Error', detail:
            'Seleccione una empresa'
        });

    }

    if (this.selectedCompany !== null && this.selectedCompany !== undefined && this.selectedCharge !== null
      && this.selectedCharge !== undefined) {
      console.log("Seleciono las dos opciones");

      try {
        await this.paymentService.getEmployeesPayedByCompanyAndCharge(this.selectedCompany.companyId, this.selectedCharge.chargeId).then(
          (data: EmployeeReportDto[]) => {
            this.employeesPayed = data;
          }
        );

      } catch (error) {
        console.log("Error en findEmployees line 124: ", error);
        console.log("this.employeesPayed",this.employeesPayed);
        if(error==404){
          this.employeesPayed=[]
        }
      }

    }


  }

  async reportPayments() {


    if (this.selectedPeriod !== null && this.selectedPeriod !== undefined && this.selectedEmployees.length !== 0) {
      //Only do the request if the period and employees are selected
      //Convert the info
      this.selectedEmployees.forEach((element) => {
        this.employeesToReport.personalNumbers.push(element.personalNumber);
      });
      this.employeesToReport.codePeriod = this.selectedPeriod.description;

      try {
        await this.paymentService.reportPayments(this.employeesToReport).then((data: ReportPaymentDto[]) => {
          this.paymentsReported = data;
        });
      } catch (error) {

        console.log("En report payments error: ",error);

        this.messageService.add(
          {
            severity: 'error',
            summary: 'Error', detail:
              'Se obtuvo un error interno: '+error,
          });
      }

      console.log("contenido de employeesToReport: ", this.employeesToReport);

      console.log("contenido de paymentsReported: ", this.paymentsReported);

      this.dataService.reportedPayments=this.paymentsReported;

      this.router.navigate(['/detailsPayments']);

    } else {

      const periodNull = this.selectedPeriod === null || this.selectedPeriod === undefined;

      //When the period is not selected but is selected employees
      if (periodNull && this.selectedEmployees.length !== 0) {

        this.messageService.add(
          {
            severity: 'warn',
            summary: 'Advertencia', detail:
              'Seleccione un periodo para reportar'
          });
      }

      //When the period  is selected but not the employees
      if (this.selectedEmployees.length === 0 && !periodNull) {
        this.messageService.add(
          {
            severity: 'warn',
            summary: 'Advertencia', detail:
              'Seleccione los empleados a reportar'
          });
      }

      //when...

    }

  }

  //To enable the button
  checkButton(): boolean {

    if (this.selectedPeriod !== null && this.selectedPeriod !== undefined && this.selectedEmployees.length !== 0) {
      return false;
    } else {
      return true;
    }

  }


}
