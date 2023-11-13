import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PrimeNgModule } from './primeng/primeng.module';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { PruebaComponent } from './prueba/prueba.component';
import { AssignConceptsComponent } from './assign-concepts/assign-concepts.component';
import { PageLiquidationsComponent } from './page-liquidations/page-liquidations.component';
import { ReportPaymentComponent } from './report-payment/report-payment.component';
import { DetailPaymentComponent } from './detail-payment/detail-payment.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { LoginComponent } from './login/login.component';
import { SelectAvailableEmployeesComponent } from './select-available-employees/select-available-employees.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    PruebaComponent,
    AssignConceptsComponent,
    PageLiquidationsComponent,
    ReportPaymentComponent,
    DetailPaymentComponent,
    PaymentHistoryComponent,
    LoginComponent,
    SelectAvailableEmployeesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    PrimeNgModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
