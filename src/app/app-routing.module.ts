import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PruebaComponent } from './prueba/prueba.component';
import { AssignConceptsComponent } from './assign-concepts/assign-concepts.component';
import { PageLiquidationsComponent } from './page-liquidations/page-liquidations.component';
import { ReportPaymentComponent } from './report-payment/report-payment.component';

const routes: Routes = [{path:'hola',component:HeaderComponent},
{path: 'home', component:HomeComponent},
{path:'prueba',component:PruebaComponent},
{path:'assignConcepts',component:AssignConceptsComponent},
{path:'liquidations',component:PageLiquidationsComponent},
{path:'reportPayments',component:ReportPaymentComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
