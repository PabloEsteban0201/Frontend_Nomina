import { Component } from '@angular/core';
import { AvailableEmployeesService } from '../service/available-employees.service';
import { EmployeeDto } from 'src/model/EmployeeDto';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataSharedService } from '../service/data-shared.service';

@Component({
  selector: 'app-select-available-employees',
  templateUrl: './select-available-employees.component.html',
  styleUrls: ['./select-available-employees.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class SelectAvailableEmployeesComponent {

  //Data to show in the table
  availableEmployees: EmployeeDto[]=[];

  //selected in table
  selectedEmployees: EmployeeDto[]=[];

  //Total employees
  countEmployees:number=0;

  //Paginator
  first: number = 0;
  rows: number = 10;
  page: number = 0;

  constructor(private availableEmployeesService:AvailableEmployeesService, private router: Router, private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private dataShareService:DataSharedService){

  }

  async ngOnInit(){

    await this.getCountEmployees();
    

    try{

      await this.availableEmployeesService.getPaginatedAvailableEmployeesDto(0,this.rows).then((data:EmployeeDto[])=>{
        this.availableEmployees=data;
      });

    }catch(error){
      console.log("Error al obtener los empleados: ",error);
    }

    console.log(this.countEmployees);
  }


  async onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.page = this.first / this.rows;

    try{

      await this.availableEmployeesService.getPaginatedAvailableEmployeesDto(this.page,this.rows).then((data:EmployeeDto[])=>{
        this.availableEmployees=data;
      });

    }catch(error){
      console.log("Error en el paginador: ",error);
    }


  }

  async getCountEmployees() {

    try{
      this.availableEmployeesService.getCountEmployees().then((data:number)=>{
        this.countEmployees=data;
      });
    }catch(error){
      console.log("error en obtener total de empleados",error);
    }
    
  }

  assignConcepts(){
    
    if(this.selectedEmployees.length!==0){
      this.router.navigate(['/assignConcepts']);
    }else{
      this.messageService.add(
        {
          severity: 'error',
          summary: 'Error', detail:
            'Seleccione al menos un empleado'
        });
    }
  }

  getEmployeesSelected() {
    
    if(this,this.selectedEmployees.length!==0){
      this.dataShareService.selectedEmployeesNumbers=this.selectedEmployees;
    }
   
  }




}
