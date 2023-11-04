
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    declarations: [
      
    ],
    imports: [
        TableModule,
        ButtonModule,
        PaginatorModule
    ],
    exports:[
        TableModule,
        ButtonModule,
        PaginatorModule
    ]
  })
  export class PrimeNgModule { }
  