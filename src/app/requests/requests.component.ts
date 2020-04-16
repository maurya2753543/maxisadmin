import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpCallService } from '../services/http-call.service';
import { ModalComponent } from 'ng2-bs4-modal/lib/components/modal';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  requestArr: Array<any> = [];
  idArr = [];
  featureList = []
  retrieveNo: number;
  noOfPendingReq: number;
  totalUnAssignedPendingReq:number;
  selectRejectedId: any;
  selectedIndex: any;
  rejectReason: String;
  userId = JSON.parse(localStorage.getItem('UserDetails')).userId;
  userName:string = JSON.parse(localStorage.getItem('UserDetails')).name;
  @ViewChild('modal') modal: ModalComponent;
  @ViewChild('rejectModal') rejectModal: ModalComponent;

  constructor(private httpService: HttpCallService,
    private spinner: NgxSpinnerService) {
      this.getActiveRequest();
  }


  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('UserDetails'));
    this.featureList = user.featureList;
  }

  routeToAssign() {
    // this.router.navigate(['assign-requests']);
  }

  bulkApproval() {
    this.modal.open();
  }

  assignRequest() {
    this.spinner.show()
    this.httpService.assignRequest(this.userId, this.retrieveNo, this.userName)
      .subscribe((res) => {
        this.spinner.hide()
        if (res.payload && !res.payload.noData) {
          this.requestArr = res.payload.listOfDeviceAssigned;
          if(res.payload.listOfDeviceAssigned.length){
            this.noOfPendingReq = res.payload.listOfDeviceAssigned[0].totalAssignedPendingReq;
            this.totalUnAssignedPendingReq = res.payload.listOfDeviceAssigned[0].totalUnAssignedPendingReq;
          }
        }
        this.getActiveRequest();
      },
      (err)=>{
        this.spinner.hide()
      })
  }

  getActiveRequest() {
    this.spinner.show()
    this.idArr = [];
    this.httpService.getPendingRequest(this.userId)
      .subscribe((res) => {
        this.spinner.hide()
        if (res.responseCode == 200) {
          if (res.payload.length && !res.payload[0].noData) {
            this.requestArr = res.payload;
            this.noOfPendingReq = res.payload[0].totalAssignedPendingReq;
            this.totalUnAssignedPendingReq = res.payload[0].totalUnAssignedPendingReq;
            this.requestArr.forEach((item) => {
              this.idArr.push(item.testId);
            })
          }
          else {
            this.noOfPendingReq = res.payload[0].totalAssignedPendingReq;
            this.totalUnAssignedPendingReq = res.payload[0].totalUnAssignedPendingReq;
            this.requestArr = []
          }
        }
        else {
          console.log("getting error");
        }
      },
      (err)=>{
        this.spinner.hide()
      })
  }

  approve(selectedId, index) {
    this.spinner.show()
    var selectedIndex = index;
    this.idArr.forEach((item, index) => {
      if (item == selectedId) {
        this.idArr.splice(index, 1);
      }
    })
    let params = {
      "userId": this.userId,
      "approvedId": selectedId,
      "unApprovedId": this.idArr
    }
    this.httpService.approveRequest(params)
      .subscribe((res: any) => {
        this.spinner.hide()
        if(res.responseCode == 200)
          this.getActiveRequest()
        // if (res.payload[0].testId == null) {
        //   // this.requestArr.splice(selectedIndex, 1);
        //   this.requestArr = [];
        //   this.noOfPendingReq = res.payload[0].totalAssignedPendingReq;
        //   this.totalUnAssignedPendingReq = res.payload[0].totalUnAssignedPendingReq;
        // }
        // else {
        //   // this.requestArr[selectedIndex].msisdn = res.payload[0].msisdn;
        //   // this.requestArr[selectedIndex].imeiNo = res.payload[0].imeiNo
        //   // this.requestArr[selectedIndex].testId = res.payload[0].testId
        //   // this.requestArr[selectedIndex].customerNumber = res.payload[0].customerNumber;
        //   // this.requestArr[selectedIndex].requestDate = res.payload[0].requestDate
        //   // this.requestArr[selectedIndex].imageUrl = res.payload[0].imageUrl;
        //   this.requestArr = res.payload;
        //   this.noOfPendingReq = res.payload[0].totalAssignedPendingReq;
        //   this.totalUnAssignedPendingReq = res.payload[0].totalUnAssignedPendingReq;
        //   this.idArr.push(res.payload[0].testId);
        // }
      },
      (err)=>{
        this.spinner.hide()
      })
  }

  openRejectModal(testId, index) {
    this.rejectReason = '';
    this.selectRejectedId = testId;
    this.selectedIndex = index;
    this.rejectModal.open();
  }

  reject() {
    this.spinner.show()
    this.idArr.forEach((item, index) => {
      if (item == this.selectRejectedId) {
        this.idArr.splice(index, 1);
      }
    })
    let params = {
      "userId": this.userId,
      "rejectedId": this.selectRejectedId,
      "rejectedReasons": this.rejectReason,
      "unRejectedIds": this.idArr
    }
    this.httpService.rejectRequest(params)
      .subscribe((res: any) => {
        this.spinner.hide()
        if(res.responseCode == 200){
          this.rejectModal.close();
          this.getActiveRequest();
        }
        // if (res.payload[0].testId == null) {
        //   // this.requestArr.splice(this.selectedIndex, 1);
        //   this.requestArr = [];
        //   this.noOfPendingReq = res.payload[0].totalAssignedPendingReq;
        //   this.totalUnAssignedPendingReq = res.payload[0].totalUnAssignedPendingReq;
        //   this.rejectModal.close()
        // }
        // else {
        //   // this.requestArr[this.selectedIndex].msisdn = res.payload[0].msisdn;
        //   // this.requestArr[this.selectedIndex].imeiNo = res.payload[0].imeiNo
        //   // this.requestArr[this.selectedIndex].customerNumber = res.payload[0].customerNumber
        //   // this.requestArr[this.selectedIndex].requestDate = res.payload[0].requestDate
        //   // this.requestArr[this.selectedIndex].imageUrl = res.payload[0].imageUrl
        //   this.requestArr = res.payload;
        //   this.noOfPendingReq = res.payload[0].totalAssignedPendingReq;
        //   this.totalUnAssignedPendingReq = res.payload[0].totalUnAssignedPendingReq;
        //   this.rejectModal.close()
        //   this.idArr.push(res.payload[0].testId);
        // }
      },
      (err)=>{
        this.spinner.hide()
      })
  }

  bulkApprove() {
    this.spinner.show()
    this.httpService.bulkApprovalRequest(this.userId)
      .subscribe(
        (res) => {
          this.spinner.hide()
          this.requestArr = [];
          this.noOfPendingReq = 0;
          this.modal.close()
        }),
      (err) => {
        this.spinner.hide()
        this.modal.close()
      }
  }

  releaseRequest() {
    this.spinner.show()
    this.httpService.releaseRequest(this.userId)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.requestArr = [];
          this.noOfPendingReq = 0;
          if(res['payload'].totalUnAssignedPendingReq){
            this.totalUnAssignedPendingReq = res['payload'].totalUnAssignedPendingReq;
          }
        },
      (err) => {
        this.spinner.hide()
        console.log("error in api", err);
      })
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
}