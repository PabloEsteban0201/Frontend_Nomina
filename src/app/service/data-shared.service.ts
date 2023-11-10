import { Injectable } from '@angular/core';
import { EmployeeDto } from 'src/model/EmployeeDto';
import { RequestLiquidationDto } from 'src/model/RequestLiquidationDto';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  selectedEmployeesNumbers!:EmployeeDto[];

  requestLiquidationsDto!:RequestLiquidationDto[];

  constructor() { }
}
