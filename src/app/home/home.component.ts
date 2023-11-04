import { Component } from '@angular/core';
import { Prueba } from 'src/model/prueba';
import { PruebaService } from '../service/prueba.service';
import { employee } from 'src/model/employee';
import { Route, Router } from '@angular/router';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  employees:any;

  numberOfeEmployees:any;

  selectedEmployees!: employee;

  constructor(private service:PruebaService, private router:Router){
    
  }

  ngOnInit(){
    this.getEmployees()

  }
  //

  getEmployees(){
    //this.service.getAllEmployees().subscribe(data=>{this.employees=data})
    this.service.getEmployeesPaginated(0).subscribe(data=>{this.employees=data});
  }

  getEmployeesSelected(){
    console.log(this.selectedEmployees);
    this.router.navigate(["/hola"])
  }

  first: number = 0;
  rows: number = 5;

  //Page number
  page: number = 0;

  onPageChange(event: any) {
      this.first = event.first;
      this.rows = event.rows;

      this.page = this.first/this.rows;

      this.service.getEmployeesPaginated(this.page).subscribe(data=>{this.employees=data});

      console.log(this.page)
      

  }
}
