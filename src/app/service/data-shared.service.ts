import { Injectable } from '@angular/core';
import { EmployeeDto } from 'src/model/EmployeeDto';
import { EmployeeReportDto } from 'src/model/EmployeeReportDto';
import { PaymentEmployeeDto } from 'src/model/PaymentEmployeeDto';
import { ReportPaymentDto } from 'src/model/ReportPaymentDto';
import { RequestLiquidationDto } from 'src/model/RequestLiquidationDto';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  selectedEmployeesNumbers!:EmployeeDto[];

  requestLiquidationsDto!:RequestLiquidationDto[];

  reportedPayments!:ReportPaymentDto[];

  constructor() { }
}
