import { Component } from '@angular/core';
import { RequestLiquidationDto } from 'src/model/RequestLiquidationDto';
import { DataSharedService } from '../service/data-shared.service';
import { Router } from '@angular/router';
import { liquidateEmployeeDto } from 'src/model/LiquidateEmployeeDto';
import { LiquidationsService } from '../service/liquidations.service';

@Component({
  selector: 'app-page-liquidations',
  templateUrl: './page-liquidations.component.html',
  styleUrls: ['./page-liquidations.component.css']
})


export class PageLiquidationsComponent {

  //data de entrada
  requestLiquidationEntry:RequestLiquidationDto[]=[];

  //Data to show in table
  liquidateEmployees: liquidateEmployeeDto[]=[];


  //Data to test
  //testEntry:RequestLiquidationDto = {personalNumber:127,paymentId:67};

  constructor(private router:Router,private dataShareService: DataSharedService, private liquidationService:LiquidationsService){
    

  }

  ngOnInit(){
    //Get the data from the assign view
    this.requestLiquidationEntry=this.dataShareService.requestLiquidationsDto;
    
    //Test remove this
    //this.requestLiquidationEntry.push(this.testEntry);
    console.log("Datos que vienen de liquidar: ",this.requestLiquidationEntry);

    this.chargeLiquidations(this.requestLiquidationEntry);


  }

  //Function to call the payment liquidation
  async chargeLiquidations(requestLiquidationEntry:RequestLiquidationDto[]){
    try{
      await this.liquidationService.liquidateEmployees(requestLiquidationEntry).then((data:liquidateEmployeeDto[])=>{
        this.liquidateEmployees=data;
      });

    }catch(error){
      //TODO send message of error
    }
  }

  exit(){
    this.requestLiquidationEntry=[];
    this.router.navigate(['/home']);
  }







}
