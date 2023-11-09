import { Injectable } from '@angular/core';
import { EmployeeDto } from 'src/model/EmployeeDto';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  selectedEmployeesNumbers!:EmployeeDto[];

  constructor() { }
}
