import { Component } from '@angular/core';
import { Prueba } from 'src/model/prueba';
import { PruebaService } from '../service/prueba.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'hola mubdo ya se angular';
  nombre:string ="";
  employees:any;

  constructor(private service:PruebaService){
    console.log("Holaaaa")
  }

  ngOnInit(){
    this.getEmployees()
  }
  //

  getEmployees(){
    this.service.getAllEmployees().subscribe(data=>{this.employees=data})
  }
}
