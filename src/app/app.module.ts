import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsComponent } from './requests/requests.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { MyHttpInterceptor } from './services/my-http-interceptor';
import { HttpCallService } from './services/http-call.service';
import { ListRequestComponent } from './list-request/list-request.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ModalModule } from 'ng2-bs4-modal/lib/ng2-bs4-modal.module'
import { LoginService } from './login/login.service';
import { MyDatePickerModule } from 'mydatepicker';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormatDate } from './pipes/customDate.pipe';
import { SubsReportComponent } from './transaction-report/subs-report.component';
import { CancelReportComponent } from './cancel-report/cancel-report.component';
import { SmsLogComponent } from './sms-log/sms-log.component';
import { NeerajComponent } from './neeraj/neeraj.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RequestsComponent,
    SubscriptionsComponent,
    CustomersComponent,
    LoginComponent,
    ListRequestComponent,
    FormatDate,
    SubsReportComponent,
    CancelReportComponent,
    SmsLogComponent,
    NeerajComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule,
    MyDatePickerModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgxImageZoomModule.forRoot()
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MyHttpInterceptor,
    //   multi: true
    // },
    HttpCallService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
