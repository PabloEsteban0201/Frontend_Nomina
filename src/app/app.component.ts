import { Component } from '@angular/core';
import { Prueba } from 'src/model/prueba';
import { PruebaService } from './service/prueba.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
