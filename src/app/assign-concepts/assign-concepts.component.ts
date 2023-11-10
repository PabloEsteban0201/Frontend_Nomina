import { Component } from '@angular/core';
import { DataSharedService } from '../service/data-shared.service';
import { AssignConceptsService } from '../service/assign-concepts.service';
import { EmployeeDto } from 'src/model/EmployeeDto';
import { AssignConceptEmployee } from 'src/model/AssignConceptEmployeeDto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BenefitsLicensesDto } from 'src/model/BenefitsLicensesDto';
import { RequestLiquidationDto } from 'src/model/RequestLiquidationDto';
import { Route, Router } from '@angular/router';

interface Benefit {
  name: string,
  code: string
}

interface License {
  name: string,
  code: string
}

interface Tax {
  name: string,
  code: string
}

interface Retention {
  name: string,
  code: string
}

@Component({
  selector: 'app-assign-concepts',
  templateUrl: './assign-concepts.component.html',
  styleUrls: ['./assign-concepts.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AssignConceptsComponent {

  //De entrada
  employees!: EmployeeDto[];

  //Solo para la entrada
  benefistsOptions!: string[];
  licensesOptions!: string[];
  taxesOptions!: string[];
  retentionsOptions!: string[];

  //Multi select
  optionBenefits!: Benefit;
  optionLicenses!: License;
  optionTaxes!: Tax;
  optionRetentions!: Retention;

  //Objeto del componente
  assingConceptEmployees: AssignConceptEmployee[] = [];
  assignConceptEmployee!: AssignConceptEmployee;


  //multiselect
  benefits: Benefit[] = [];
  lincenses: License[] = [];
  taxes: Tax[] = [];
  retentions: Retention[] = [];

  //Para las selecciones de conceptos
  selectedBenefits: Benefit[] = [];
  selectedLicenses: License[] = [];
  selectedTaxes: Tax[] = [];
  selectedRetentions: Retention[] = [];

  dialogConcepts: boolean = false;

  //To assign
  requestConcepts: BenefitsLicensesDto[] = [];

  //To liquidate
  requestLiquidationDto: RequestLiquidationDto[] = [];

  constructor(private router:Router,private dataShareService: DataSharedService, private assingService: AssignConceptsService, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit() {
    this.employees = this.dataShareService.selectedEmployeesNumbers;
    this.chargeTable();
    this.getAssignEmployeeDtos();

  }

  async chargeTable() {

    try {
      await this.assingService.getAllBenefits().then((data: string[]) => {
        this.benefistsOptions = data;
      });
      await this.assingService.getAllLicenses().then((data: string[]) => {
        this.licensesOptions = data;
      });
      await this.assingService.getAllTaxes().then((data: string[]) => {
        this.taxesOptions = data;
      });
      await this.assingService.getAllRetentions().then((data: string[]) => {
        this.retentionsOptions = data;
      });
      this.setOptionsBenefits();
      this.setOptionsLicenses();
      this.setOptionsTaxes();
      this.setOptionsRetentions();
    } catch (error) {

    }


  }

  getAssignEmployeeDtos() {
    for (let i = 0; i < this.employees.length; i++) {

      this.assignConceptEmployee = {
        namePerson: this.employees[i].namePerson,
        lastname: this.employees[i].lastname,
        personalNumber: this.employees[i].personalNumber,
        nameCompany: this.employees[i].nameCompany,
        nameBenefits: [],
        nameLicenses: [],
        nameRetentions: [],
        nameTaxes: []
      };

      this.assingConceptEmployees.push(this.assignConceptEmployee);

    }
  }



  hideDialog() {
    this.dialogConcepts = false;
    this.selectedBenefits = [];
    this.selectedRetentions = [];
    this.selectedTaxes = [];
    this.selectedLicenses = [];
  }

  assignConcepts(employeeAssign: AssignConceptEmployee) {


    this.assignConceptEmployee = { ...employeeAssign }



    //set the selected options in the multiselect
    //Check if the name benefits is not empty
    if (this.assignConceptEmployee.nameBenefits.length) {
      this.setSelectedBenefits();
    } else {
      this.selectedBenefits = [];
    }

    if (this.assignConceptEmployee.nameLicenses.length) {
      this.setSelectedLicenses();
    } else {
      this.selectedLicenses = [];
    }
    if (this.assignConceptEmployee.nameTaxes.length) {
      this.setSelectedTaxes();
    } else {
      this.selectedTaxes = [];
    }
    if (this.assignConceptEmployee.nameRetentions.length) {
      this.setSelectedRetentions();
    } else {
      this.selectedRetentions = [];
    }

    console.log("Prueba de contenido selectedBenefits: ", this.selectedBenefits)

    this.dialogConcepts = true;

  }

  saveConcepts(employeeAssign: AssignConceptEmployee) {

    const indice = this.assingConceptEmployees.findIndex(elemento => elemento.personalNumber === employeeAssign.personalNumber);

    if (this.selectedBenefits == null) {
      this.selectedBenefits = [];
    }
    if (this.selectedLicenses == null) {
      this.selectedLicenses = [];
    }
    if (this.selectedTaxes == null) {
      this.selectedTaxes = [];
    }
    if (this.selectedRetentions == null) {
      this.selectedRetentions = [];
    }

    //Para benefits
    if (this.selectedBenefits !== null) {
      const benefits: string[] = [];
      for (let index = 0; index < this.selectedBenefits.length; index++) {
        benefits.push(this.selectedBenefits[index].name);
      }
      this.assingConceptEmployees[indice].nameBenefits = benefits;
      console.log("Prueba1: ", this.assingConceptEmployees[indice].nameBenefits)
    } else {
      this.selectedBenefits = [];
    }

    //Para licenses
    if (this.selectedLicenses !== null) {
      const licenses: string[] = [];
      for (let index = 0; index < this.selectedLicenses.length; index++) {
        licenses.push(this.selectedLicenses[index].name);
      }
      this.assingConceptEmployees[indice].nameLicenses = licenses;
    } else {
      this.selectedLicenses = [];
    }

    //Para taxes
    if (this.selectedTaxes !== null) {

      const taxes: string[] = [];
      for (let index = 0; index < this.selectedTaxes.length; index++) {
        taxes.push(this.selectedTaxes[index].name);
      }
      this.assingConceptEmployees[indice].nameTaxes = taxes;
    } else { this.selectedTaxes = []; }


    //Para retentions
    if (this.selectedRetentions !== null) {
      const retentions: string[] = [];
      for (let index = 0; index < this.selectedRetentions.length; index++) {
        retentions.push(this.selectedRetentions[index].name);
      }
      this.assingConceptEmployees[indice].nameRetentions = retentions;
    } else { this.selectedRetentions = []; }

    console.log(this.selectedBenefits);

    //Resetear selects
    this.selectedBenefits = [];
    this.selectedLicenses = [];
    this.selectedTaxes = [];
    this.selectedRetentions = [];

    this.dialogConcepts = false;

    console.log(this.assingConceptEmployees);

  }

  //Liquidate
  async liquidate() {
    this.assingConceptEmployees.forEach(element => {
      const personalNumber = element.personalNumber;
      const conceptsB = element.nameBenefits;
      const conceptsL = element.nameLicenses;
      const conceptsT = element.nameTaxes;
      const conceptsR = element.nameRetentions;

      const conceptsPLTR = conceptsB.concat(conceptsL, conceptsR, conceptsT);

      this.requestConcepts.push({ benefitsAndLicenses: conceptsPLTR, personalNumber: personalNumber });

    });
    console.log("resultado de realizar la conversion: ", this.requestConcepts);

    await this.assingService.liquidateEmployees(this.requestConcepts).then((data: RequestLiquidationDto[]) => {
      this.requestLiquidationDto = data;
      
    });
    
    this.dataShareService.requestLiquidationsDto=this.requestLiquidationDto;

    this.router.navigate(['/liquidations']);


  }

  setOptionsBenefits() {
    for (let i = 0; i < this.benefistsOptions.length; i++) {
      const optionBenefit = { name: this.benefistsOptions[i], code: this.benefistsOptions[i] };
      this.benefits.push(optionBenefit);

    }
  }

  setOptionsLicenses() {
    for (let i = 0; i < this.licensesOptions.length; i++) {
      const optionLicense = { name: this.licensesOptions[i], code: this.licensesOptions[i] };
      this.lincenses.push(optionLicense);

    }
  }

  setOptionsTaxes() {
    for (let i = 0; i < this.taxesOptions.length; i++) {
      const optionTax = { name: this.taxesOptions[i], code: this.taxesOptions[i] };
      this.taxes.push(optionTax);

    }
  }

  setOptionsRetentions() {
    for (let i = 0; i < this.retentionsOptions.length; i++) {
      const optionRetention = { name: this.retentionsOptions[i], code: this.retentionsOptions[i] };
      this.retentions.push(optionRetention);

    }
  }

  setSelectedBenefits() {


    for (let i = 0; i < this.assignConceptEmployee.nameBenefits.length; i++) {
      this.selectedBenefits = [];
      const nameBenefit = this.assignConceptEmployee.nameBenefits[i];
      const optionBenefit = { name: nameBenefit, code: nameBenefit };
      this.selectedBenefits.push(optionBenefit);

    }
  }

  setSelectedLicenses() {
    for (let i = 0; i < this.assignConceptEmployee.nameLicenses.length; i++) {
      this.selectedLicenses = [];
      const nameLicense = this.assignConceptEmployee.nameLicenses[i];
      const optionLicense = { name: nameLicense, code: nameLicense };
      this.selectedLicenses.push(optionLicense);

    }
  }

  setSelectedTaxes() {
    for (let i = 0; i < this.assignConceptEmployee.nameTaxes.length; i++) {
      this.selectedTaxes = [];
      const nameTax = this.assignConceptEmployee.nameTaxes[i];
      const optionTax = { name: nameTax, code: nameTax };
      this.selectedTaxes.push(optionTax);

    }
  }

  setSelectedRetentions() {
    for (let i = 0; i < this.assignConceptEmployee.nameRetentions.length; i++) {
      this.selectedRetentions = [];
      const nameRet = this.assignConceptEmployee.nameRetentions[i];
      const optionRetention = { name: nameRet, code: nameRet };
      this.selectedRetentions.push(optionRetention);

    }
  }




}
