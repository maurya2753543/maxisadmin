import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RequestsComponent } from "./requests/requests.component";
import { SubscriptionsComponent } from "./subscriptions/subscriptions.component";
import { ListRequestComponent } from './list-request/list-request.component';
import { SubsReportComponent } from './transaction-report/subs-report.component';
import { CancelReportComponent } from './cancel-report/cancel-report.component';
import { SmsLogComponent } from './sms-log/sms-log.component';
import { NeerajComponent } from './neeraj/neeraj.component';


export const APP_ROUTES: Routes = [
  { path: '',redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'pending-requests', component: RequestsComponent },
  { path: 'requests', component: ListRequestComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'trans-report', component: SubsReportComponent},
  { path: 'cancel-report',component: CancelReportComponent},
  { path: 'sms-log',component: SmsLogComponent},
  {path: 'neeraj' , component: NeerajComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(APP_ROUTES,{
      useHash:false,
      preloadingStrategy:PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}