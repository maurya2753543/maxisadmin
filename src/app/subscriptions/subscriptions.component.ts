import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpCallService } from '../services/http-call.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from 'ng2-bs4-modal/lib/components/modal';


export class SearchParams {
  msisdn = "";
  deviceId = "";
  policyNo = '';
  policyStatus = 'ALL';
  customerId = '';
}

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  @ViewChild('imagePopup') imagePopup: ModalComponent
  requestArr = [];
  requestArray = [];
  searchParams = new SearchParams();
  isFilterOpen: boolean;
  noData: boolean = false;
  noDataMesssage: string;
  p: number = 1;
  activeCount: number;
  expiredCount: number;
  unsubscribeCount: number;
  pendingCount: number;
  lapsedCount: number;
  popupImageUrl:any;

  constructor(private httpService: HttpCallService,
    private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.searchSubscription();
  }

  searchSubscription() {
    this.spinner.show()
    if (this.searchParams.policyStatus == "ALL")
      this.searchParams.policyStatus = ''
    this.httpService.subscribeRequest(this.searchParams)
      .subscribe((res: any) => {
        this.spinner.hide()
        if (res.payload.code != 4005) {
          this.requestArr = res.payload.subscriptions;
          this.requestArray = this.requestArr;
          this.activeCount = res.payload.activeCount;
          this.lapsedCount = res.payload.lapsedCount;
          this.expiredCount = res.payload.expiredCount;
          this.unsubscribeCount = res.payload.unsubscribeCount; 
          this.noData = false;
        }
        else {
          this.noData = true
          this.activeCount = null;
          this.lapsedCount = null;
          this.expiredCount = null;
          this.unsubscribeCount = null; 
          this.noDataMesssage = res.payload.messages[0]
          this.requestArr = [];
        }
      },
        (err) => {
          this.spinner.hide()
          console.log("error", err);
        })
  }

  filterByPolicyStatus(policyStatus: string) {
    this.requestArr = this.requestArray.filter(item => {
      if (item.policyStatus != policyStatus) {
        return false
      }
      return true;
    });
    return this.requestArr;
  }

  clearForm() {
    this.searchParams = new SearchParams();
  }

  showFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  showImagePopUP(imageUrl){
    this.popupImageUrl = imageUrl;
    this.imagePopup.open()
  }
}
