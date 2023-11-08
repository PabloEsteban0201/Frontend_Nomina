
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService, MessageService } from 'primeng/api';
import {CardModule} from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
@NgModule({
    declarations: [
      
    ],
    imports: [
        TableModule,
        ButtonModule,
        PaginatorModule,
        CardModule,
        ToastModule,
        ToolbarModule,
        DialogModule,
        BrowserAnimationsModule,
        InputTextModule,
        DropdownModule,
        TagModule,
        InputNumberModule,
        ConfirmDialogModule,
        FileUploadModule
    ],
    exports:[
        TableModule,
        ButtonModule,
        PaginatorModule,
        CardModule,
        ToastModule,
        ToolbarModule,
        DialogModule,
        BrowserAnimationsModule,
        InputTextModule,
        DropdownModule,
        TagModule,
        InputNumberModule,
        ConfirmDialogModule,
        FileUploadModule

    ]
  })
  export class PrimeNgModule { }
  