import { ConceptsDto } from "./ConceptsDto";

export interface PaymentDetailsDto {
    paymentId: number;

    payDate: Date;

    period:number;

    namePerson: string;

    lastname: string;

    personalNumber: number;

    salary: number;

    currency: string;

    discounts: number;

    additions: number;

    total: number;

    payConcepts: ConceptsDto[];
}