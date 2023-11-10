import { ConceptsDto } from "./ConceptsDto";

export interface liquidateEmployeeDto{

    namePerson:string;
    lastname:string;
    personalNumber:number;
    salary:number;
    currency:string;
    benefits: ConceptsDto[];
    licenses: ConceptsDto[];
    taxes: ConceptsDto[];
    retentions: ConceptsDto[];
}