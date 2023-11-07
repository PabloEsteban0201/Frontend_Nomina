import { Component } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { employee } from 'src/model/employee';
import { Route, Router } from '@angular/router';
import { EmployeeDto } from 'src/model/EmployeeDto';
import { CompanieNamesRequest } from 'src/model/CompaniesNamesRequest';
import { ConfirmationService, MessageService } from 'primeng/api';

interface State {
  label: string;
  value: number;
}

interface OptionCompany {
  label: string;
  value: string;
}

interface OptionCharge {
  label: string;
  value: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class HomeComponent {

  employees!: EmployeeDto[];

  companiesNamesRequest: CompanieNamesRequest = { companiesNames: [] };

  selectedEmployees!: employee;

  countEmployees: number;

  employeeDto: any;

  employeeDialog: boolean = false;

  submitted: boolean = false;

  statuses!: State[] | undefined;

  stateEmployee: State | undefined;

  companiesOptions: OptionCompany[] = [];

  companyEmployee: OptionCompany | undefined;

  optionCompany: OptionCompany | undefined;

  companiesNames: string[] = [];

  cont: number = 0;

  chargesNames: string[] = [];

  chargesOptions: OptionCharge[] = [];

  optionCharge: OptionCharge | undefined;

  employee!: EmployeeDto;

  constructor(private service: EmployeeService, private router: Router) {
    this.countEmployees = 0;

  }

  ngOnInit() {
    this.getEmployeesDto();
    this.getCountEmployees();
    this.getAllCompanyNames();
    this.getAllChargesNames();

    console.log()

    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Retirado', value: 0 }
    ];


  }

  openNew() {
    //TODO 
    //this.employeeDto = {};
    this.submitted = false;
    this.employeeDialog = true;
  }

  getEmployeesDto() {
    this.service.getEmployeesDtoPaginated(0).subscribe(data => { this.employees = data });
  }


  // getEmployees() {
  //   //this.service.getAllEmployees().subscribe(data=>{this.employees=data})
  //   this.service.getEmployeesPaginated(0).subscribe(data => { this.employees = data });
  // }

  getEmployeesSelected() {
    console.log(this.selectedEmployees);
    this.router.navigate(["/hola"])
  }

  first: number = 0;
  rows: number = 10;

  //Page number
  page: number = 0;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

    this.page = this.first / this.rows;

    this.service.getEmployeesDtoPaginated(this.page).subscribe(data => { this.employees = data });

  }

  getCountEmployees() {

    this.service.getCountEmployees().subscribe(data => { this.countEmployees = data })
  }

  editEmployee(employeeDto: any) {
    this.employee = {...employeeDto}
    if (this.cont < 2) {
      this.cont++;
    }

    console.log('cont', this.cont)
    this.employeeDto = { ...employeeDto };
    if (this.employeeDto.state == 1) {
      this.stateEmployee = { label: 'Activo', value: 1 };
    } else {
      this.stateEmployee = { label: 'Retirado', value: 0 };
    }

    this.companiesNames = this.companiesNamesRequest.companiesNames;

    if (this.cont == 1) {
      //charge the companies
      this.setOptionsCompany();
      this.setOptionsCharges();
    }

    this.optionCompany = this.companiesOptions.find((element) => element.label === employeeDto.nameCompany);

    this.optionCharge = { label: employeeDto.nameCharge, value: employeeDto.nameCharge };

    this.employeeDialog = true;
  }

  setOptionsCompany() {
    for (let i = 0; i < this.companiesNames.length; i++) {
      this.optionCompany = { label: this.companiesNames[i], value: this.companiesNames[i] };
      this.companiesOptions.push(this.optionCompany);
    }
  }

  setOptionsCharges() {
    for (let i = 0; i < this.chargesNames.length; i++) {
      this.optionCharge = { label: this.chargesNames[i], value: this.chargesNames[i] };
      this.chargesOptions.push(this.optionCharge);
    }
  }


  getAllCompanyNames() {

    this.service.getCompanyNames().subscribe((data) => {
      this.companiesNamesRequest = data;
    });

  }

  getAllChargesNames() {
    this.service.getChargesNames().subscribe((data) => {
      this.chargesNames = data;
    });
  }


  hideDialog() {
    this.employeeDialog = false;
    this.submitted = false;
  }


  rechargeEmployees() {
    this.service.getEmployeesDtoPaginated(this.page).subscribe(data => { this.employees = data });
  }

  findIndexByPersonalNumber(id: number): number {
    let index = -1;
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].personalNumber === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  updateEmployee(employeeDto: EmployeeDto) {
    // Lógica de la función principal
    this.submitted = true;
    this.service.updateEmployeeDto(employeeDto);
    console.log('Función principal ha terminado.');
    this.employeeDialog=false;
    
  }

  miFuncion() {
    // Lógica de la función que se ejecutará después de la función principal
    console.log('La función miFuncion se ejecutó después de la función principal.');
    this.service.getEmployeesDtoPaginated(this.page).subscribe(data => { this.employees = data });
  }

  ejecutarFuncionesEnSerie(employeeDto: EmployeeDto) {
    // Llama a la función principal
    this.updateEmployee(employeeDto);
    
    // Llama a la función miFuncion después de que funcionPrincipal haya terminado
    console.log('antes de entrar a mi funcion');
    this.miFuncion();
    console.log('Luego de entrar a mi funcion');

  }

  
}
