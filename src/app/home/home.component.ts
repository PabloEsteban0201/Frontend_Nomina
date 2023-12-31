import { Component } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { employee } from 'src/model/employee';
import { Route, Router } from '@angular/router';
import { EmployeeDto } from 'src/model/EmployeeDto';
import { CompanieNamesRequest } from 'src/model/CompaniesNamesRequest';
import { ConfirmationService, MessageService } from 'primeng/api';
import { elementAt } from 'rxjs';
import { CurrencyCompanyRequest } from 'src/model/CurrencyCompanyRequest';
import { DataSharedService } from '../service/data-shared.service';

interface State {
  label: string;
  value: number;
}

interface OptionCompany {
  label: string | null;
  value: string | null;
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

  selectedEmployees!: EmployeeDto[] | null;

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

  currenciesCompanies!: CurrencyCompanyRequest[];

  noInsert: boolean = true;

  fileSelected: File | null = null;

  selectedEmployeesNumbers!: number;

  existanceEmployee: boolean = false;

  //To get if a new operation or a update operation
  isNewEmployee: boolean = false;

  //final page
  finalPage: number = 0;

  constructor(private service: EmployeeService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService,
    private dataShareService: DataSharedService) {
    this.countEmployees = 0;

  }

  ngOnInit() {
    this.getEmployeesDto();
    this.getCountEmployees();
    this.getAllCompanyNames();
    this.getAllChargesNames();
    this.getCurrenciesCompanies();

    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Retirado', value: 0 }
    ];

  }

  openNew() {
    this.getFinalPage();
    this.noInsert = false;
    this.isNewEmployee = true;

    if (this.cont < 2) {
      this.cont++;
    }

    this.employeeDto = {};


    this.companiesNames = this.companiesNamesRequest.companiesNames;
    this.stateEmployee = undefined;
    this.optionCharge = undefined;
    this.optionCompany = undefined;
    this.employeeDto.currency = "COP";
    this.employeeDto.salary = 0;

    if (this.cont == 1) {
      //charge the companies
      this.setOptionsCompany();
      this.setOptionsCharges();
    }

    this.submitted = false;

    this.employeeDialog = true;

  }

  getEmployeesDto() {
    this.service.getEmployeesDtoPaginated(0).subscribe(data => { this.employees = data });
  }


  first: number = 0;
  rows: number = 10;

  //Page number
  page: number = 0;

  onPageChange(event: any) {
    this.first = event.first;

    console.log("first",this.first);
    console.log("rows",this.rows);

    this.rows = event.rows;

    this.page = this.first / this.rows;

    this.service.getEmployeesDtoPaginated(this.page).subscribe(data => { this.employees = data });

  }

  async getCountEmployees() {

    await this.service.getCountEmployees().then((data:number)=>{this.countEmployees=data});
  }

  editEmployee(employeeDto: any) {
    this.isNewEmployee = false;
    this.noInsert = true;
    this.employee = { ...employeeDto }
    if (this.cont < 2) {
      this.cont++;
    }

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

    //otra forma
    this.optionCharge = { label: employeeDto.nameCharge, value: employeeDto.nameCharge };
    this.optionCompany = { label: employeeDto.nameCompany, value: employeeDto.nameCompany }


    this.employeeDialog = true;
  }

  setOptionsCompany() {
    for (let i = 0; i < this.companiesNames.length; i++) {
      this.optionCompany = { label: this.companiesNames[i], value: this.companiesNames[i] };
      this.companiesOptions.push(this.optionCompany);
      this.optionCompany = undefined;
    }
  }

  setOptionsCharges() {
    for (let i = 0; i < this.chargesNames.length; i++) {
      this.optionCharge = { label: this.chargesNames[i], value: this.chargesNames[i] };
      this.chargesOptions.push(this.optionCharge);
      this.optionCharge = undefined;
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

  async rechargeEmployees() {
    await this.getCountEmployees();
    this.rows=10;
    this.first=this.page*10;
    this.page = this.first / this.rows;
    

    console.log("rows",this.rows);
    console.log("rows",this.first);
    console.log("rows",this.page);

    console.log('Función recharge employees al actualizar');
    this.service.getEmployeesDtoPaginated(this.page).subscribe(data => { this.employees = data });
  }

  async rechargeEmployeesFinalPage() {
    await this.getCountEmployees();
    this.getFinalPage();

    this.rows=10;
    this.first=this.finalPage*10;
    this.page = this.first / this.rows;
    
    
    console.log('Función recharge employees al guardar');
    console.log("final page", this.finalPage);

    this.service.getEmployeesDtoPaginated(this.page).subscribe(data => { this.employees = data });
    console.log("Despues de recargar");

  }

  async updateEmployee(employeeDto: EmployeeDto) {


    await this.service.getExistanceEmployee(employeeDto.personalNumber).then((data) => { this.existanceEmployee = data });

    console.log("existencia del empleado", this.existanceEmployee);

    if (this.existanceEmployee && !this.isNewEmployee) {
      //Update
      if (this.stateEmployee?.value == 1) {
        employeeDto.state = 1;
      } else {
        employeeDto.state = 0;
      }

      this.submitted = true;

      const optCompa = this.optionCompany?.value;

      if (optCompa !== undefined) {
        if (optCompa !== null) {
          employeeDto.nameCompany = optCompa;
        }

      } else {

      }

      const optCharge = this.optionCharge?.value;

      if (optCharge !== undefined) {
        employeeDto.nameCharge = optCharge;
      } else {

      }


      console.log("Data:", employeeDto);

      try {
        // Llama a la función principal y espera a que se complete
        await this.service.updateEmployeeDto(employeeDto);

        // Ahora llama a la función miFuncion después de la actualización
        this.rechargeEmployees();

        console.log('Luego de entrar a mi funcion');
      } catch (error) {
        console.error('Error al actualizar los datos:', error);
      }
    }

    //Nuevo registro

    if (!this.existanceEmployee && this.isNewEmployee) {
      if (this.stateEmployee?.value == 1) {
        employeeDto.state = 1;
      } else {
        employeeDto.state = 0;
      }

      const optCompa = this.optionCompany?.value;

      if (optCompa !== undefined) {
        if (optCompa !== null) {
          employeeDto.nameCompany = optCompa;
        }

      } else {

      }

      const optCharge = this.optionCharge?.value;

      if (optCharge !== undefined) {
        employeeDto.nameCharge = optCharge;
      } else {

      }

      this.submitted = true;

      try {
        // Llama a la función principal y espera a que se complete
        await this.service.saveEmployeeDto(employeeDto);
        this.rechargeEmployeesFinalPage();


      } catch (error) {
        console.error('Error al actualizar los datos:', error);
      }


      //this.service.getEmployeesDtoPaginated(this.getFinalPage()).subscribe(data => { this.employees = data });



    }

    if (this.existanceEmployee && this.isNewEmployee) {
      console.log("Ya existe")
      this.messageService.add(
        {
          severity: 'error',
          summary: 'Error', detail:
            'El número personal ya existe'
        });
    }



    this.employeeDialog = false;

  }

  //TODO esto debe revisar la base de datos
  findByPersonalNumber(in_personalNumber: number): boolean {

    this.service.getExistanceEmployee(in_personalNumber).then(data => { this.existanceEmployee = data });

    return this.existanceEmployee;

  }

  selectOption(event: any) {

    //console.log('Opción seleccionada:', event);

    const curr = this.currenciesCompanies.find((element) => element.nameCompany === this.optionCompany?.value)?.currency;

    if (curr !== undefined) {
      this.employeeDto.currency = curr;
    } else {
      this.employeeDto.currency = "COP";
    }

  }


  getCurrenciesCompanies() {
    this.service.getCurrenciesCompanies().subscribe(data => {

      this.currenciesCompanies = data;

    });
  }

  deleteEmployee(employee: EmployeeDto) {

    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar al empleado ' + employee.namePerson + ' ' + employee.lastname + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        console.log("antes del try");
        try {
          console.log("Entro al try");
          this.deleteFunction(employee.personalNumber);
        } catch (error) {
          console.log("ERROR: ", error)
        }
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Empleado eliminado', life: 3000 });

      }
    });


  }

  async deleteFunction(personalNumber: number) {
    await this.service.deleteEmployee(personalNumber);
    this.rechargeEmployees();
  }



  subirArchivo(event: any) {

    const file = event.files[0];

    if (file) {
      console.log("Econtro el archivo")
      const formData = new FormData();
      formData.append('file', file);

      this.sendFileFunction(formData);
    }

    event.files.pop();

  }

  async sendFileFunction(formData: FormData) {
    try {
      await this.service.uploadFile(formData);
      this.rechargeEmployees();
      this.messageService.add({
        severity: 'info',
        summary: 'Éxito',
        detail: 'Archivo subido correctamente.'
      });
    } catch (error) {
      console.log("Entro al nuevo catch")
      this.messageService.add(
        {
          severity: 'error',
          summary: 'Error', detail:
            'Se rechazo el contenido del archivo'
        });
    }

  }

  assignConcepts() {
    this.router.navigate(['/availableEmployees']);
  }

  reportPayments() {
    this.router.navigate(['/reportPayments']);
  }

  consultPayment(employee: EmployeeDto) {
    this.router.navigate(['/paymentHistory']);
    this.dataShareService.employeePaymentHistory = { ...employee };
  }

  deletePayments() {

    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar los pagos antiguos?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        console.log("antes del try");
        try {
          console.log("Entro al try");
          //this.deleteFunction(employee.personalNumber);
        } catch (error) {
          console.log("ERROR: ", error)
        }
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Empleado eliminado', life: 3000 });

      }
    });
  }

  getFinalPage() {
    const residuo = this.countEmployees % 10;
    console.log(this.countEmployees);
    const parteEntera = Math.trunc(this.countEmployees / 10);
    if (residuo === 0) {

      this.finalPage = parteEntera - 1;
    } else {
      this.finalPage = parteEntera;
    }

  }
}
