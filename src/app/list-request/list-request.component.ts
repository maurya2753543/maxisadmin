import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpCallService } from '../services/http-call.service';
import { IMyDpOptions } from 'mydatepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from 'ng2-bs4-modal/lib/components/modal';

export class SearchParams {

  msisdn = '';
  deviceId = '';
  customerId = '';
  startDate = "";
  endDate = "";
}
@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit {

  @ViewChild('imagePopup') imagePopup: ModalComponent
  popupImageUrl: any;
  initiatedCount: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  cancelCount: number;
  todayDate = new Date();
  startDate: Date;
  endDate: Date;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    showTodayBtn: false,
    openSelectorOnInputClick: true,
    disableSince: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() + 1 },
  };
  public myDatePickerOptions2: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    showTodayBtn: false,
    openSelectorOnInputClick: true,
    disableSince: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() + 1 },
  };

  requestArr = [];
  requestArray = [];
  noData: boolean = false;
  noDataMesssage: string;
  searchParams = new SearchParams();
  isFilterOpen: boolean;
  p: number = 1;

  constructor(private httpService: HttpCallService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.doSearch('first');
  }

  onStartDateChanged(event) {
    this.startDate = event;
    if (this.startDate['jsdate']) {
      let disableDate: Date = new Date(this.startDate['jsdate'].setDate(this.startDate['jsdate'].getDate() - 1))
      this.myDatePickerOptions2 = {
        disableUntil: { year: disableDate.getFullYear(), month: disableDate.getMonth() + 1, day: disableDate.getDate() },
      }
    }
    else {
      this.searchParams.startDate = '';
    }
  }

  onEndDateChanged(event){
    this.endDate = event;
    if (!this.endDate['jsdate']) {
      this.searchParams.endDate = '';
    }
  }

  formatDate(dateParams) {
    let inputDate = dateParams.date;
    let formattedDate = `${inputDate.year}`
    formattedDate += '-' + (inputDate.month < 10 ? ('0' + (inputDate.month)) : inputDate.month);
    formattedDate += '-' + (inputDate.day < 10 ? ('0' + inputDate.day) : inputDate.day);
    formattedDate += `T00:00:00`
    return formattedDate
  }

  doSearch(time?: string) {
    this.spinner.show();
    if (time != 'first' && this.startDate && this.endDate) {
      this.searchParams.startDate = this.formatDate(this.startDate)
      this.searchParams.endDate = this.formatDate(this.endDate)
    }

    this.httpService.listOfRequest(this.searchParams)
      .subscribe((res: any) => {
        this.spinner.hide()
        if (res.payload.code != 4005) {
          this.requestArr = res.payload.testRequests;
          this.requestArray = this.requestArr;
          this.pendingCount = res.payload.pendingCount;
          this.approvedCount = res.payload.approvedCount;
          this.initiatedCount = res.payload.initiatedCount;
          this.rejectedCount = res.payload.rejectedCount;
          this.cancelCount = res.payload.cancelCount;
          this.noData = false;
        }
        else {
          this.noData = true;
          this.noDataMesssage = res.payload.messages[0]
          this.requestArr = [];
          this.pendingCount = 0;
          this.approvedCount = 0;
          this.initiatedCount = 0;
          this.rejectedCount = 0;
          this.cancelCount = 0;
        }
      },
        (err) => {
          this.spinner.hide()
          console.log("error", err);
        })
  }

  filterByPolicyStatus(requestStatus: string) {
    this.requestArr = this.requestArray.filter(item => {
      if (item.requestStatus != requestStatus) {
        return false
      }
      return true;
    });
    return this.requestArr;
  }

  clearForm() {
    this.searchParams = new SearchParams();
    this.startDate = null;
    this.endDate = null;
  }
  showFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  showImagePopUP(imageUrl) {
    this.popupImageUrl = imageUrl;
    this.imagePopup.open()
  }
}
