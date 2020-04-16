import { Component, OnInit } from '@angular/core';
import { HttpCallService } from '../services/http-call.service';
import { IMyDpOptions } from 'mydatepicker';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import * as moment from 'moment';


export class RequestObj {
  'status': string = ""
  'startDate': any = ""
  'endDate': any = ""
}

@Component({
  selector: 'app-subs-report',
  templateUrl: './subs-report.component.html',
  styleUrls: ['./subs-report.component.css']
})
export class SubsReportComponent implements OnInit {

  isFilterOpen: boolean = false;
  requestObj = new RequestObj();
  responseArr: any = [];
  featureList = []
  todayDate = new Date();
  startDate: any;
  endDate: any;
  p: number = 1;
  noData: boolean = false;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    showTodayBtn: false,
    openSelectorOnInputClick: true,
    disableSince: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() + 1 },
  };
  public myDatePickerOptions2: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    showTodayBtn: false,
    openSelectorOnInputClick: true,
    disableSince: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() + 1 },
  };

  constructor(private httpService: HttpCallService) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('UserDetails'));
    this.featureList = user.featureList;
  }

  menuShow(module, permission) {
    let val = false;
    this.featureList.forEach(item => {
      if (item['featureCode'] == module) {
       let data1  = item['featureCode']
        item['permissionList'].forEach((value) => {
          if (value['permission'] === permission) {
            val = true;
          }
        })
      }
    }); 
    return val;
  }

  showFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  clearForm() {
    this.requestObj = new RequestObj();
    this.startDate = null;
    this.endDate = null;
  }

  onStartDateChanged(event) {
    this.startDate = event;
    if (this.startDate['jsdate']) {
      let disableDate: Date = new Date(this.startDate['jsdate'].setDate(this.startDate['jsdate'].getDate() - 1))
      this.myDatePickerOptions2 = {
        disableUntil: { year: disableDate.getFullYear(), month: disableDate.getMonth() + 1, day: disableDate.getDate() },
      }
      this.requestObj.startDate = event.formatted;
      if(this.endDate.epoc < this.startDate.epoc){
        this.endDate = null;
        this.requestObj.endDate = null;
      }
    }
    else {
      this.requestObj.startDate = '';
    }
  }

  onEndDateChanged(event) {
    this.endDate = event;
    if (!this.endDate['jsdate']) {
      this.requestObj.endDate = '';
    }
    else {
      this.requestObj.endDate = event.formatted;
    }
  }

  getReport() {
    let params = {
      "from": this.requestObj.startDate,
      "to": this.requestObj.endDate,
      "status": this.requestObj.status,
    }
    this.httpService.getTransactionReport(params)
      .subscribe((res: any) => {
        if (res.payload && res.payload.length) {
          this.responseArr = res.payload
          this.noData = false
        }
        else {
          this.noData = true;
        }
      })
  }

  downloadReport() {
    let data = [];
    this.responseArr.forEach((element) => {
      data.push(
        {
          "policyNo": element.policyNo,
          "channelSource": element.channelSource,
          "msisdnNumber": element.msisdnNumber,
          "customerIdNumber": element.customerIdNumber,
          "modelName": element.modelName,
          "imeiNumber": element.imeiNumber,
          "transactionDate": moment(element.transactionDate).format("DD/MM/YYYY HH:mm:ss")
        })
    });
    var options = {
      showLabels: true,
      showTitle: true,
      title: 'Transaction Report',
      headers: ["Policy Number", "Channel Source", "MSISDN Number", "IC/Passport Number", "Model Name", "IMEI Number", "Transaction Date"],
      nullToEmptyString: true,
    };
    if (data)
      new Angular5Csv(data, 'Transaction Report', options);
  }

}
