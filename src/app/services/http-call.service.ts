import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class HttpCallService {

  baseUrl: string = environment.hostUrl;

  constructor(private _http: HttpClient) { }

  assignRequest(userId, noOfPolicy, userName): Observable<any> {
    return this._http.post(this.baseUrl + `v1/deviceApproval/assigne?userId=${userId}&noOfPolicy=${noOfPolicy}&userName=${userName}`, '')
  }
  
  getPendingRequest(userId): Observable<any>{
    return this._http.get(this.baseUrl + `v1/deviceApproval/pending?userId=${userId}`)
  }

  approveRequest(options) {
    return this._http.post(this.baseUrl + `v1/deviceApproval/approve`, options)
  }
  rejectRequest(options){
    return this._http.post(this.baseUrl + `v1/deviceApproval/reject`, options)
  }

  bulkApprovalRequest(userId){
    return this._http.get(this.baseUrl + `v1/deviceApproval/bulkApproved?userId=${userId}`)
  }

  releaseRequest(userId){
    return this._http.get(this.baseUrl + `v1/deviceApproval/release?userId=${userId}`)

  }
  listOfRequest(payload){
    return this._http.post(this.baseUrl + `v1/deviceApproval/admin/request`, payload)
  }

  subscribeRequest(payload){
    return this._http.post(this.baseUrl + `v1/deviceApproval/admin/subscription`, payload)
  }

  getTransactionReport(payload){
    return this._http.post(this.baseUrl + `v1/deviceApproval/admin/transactionReport`, payload)
  }

  getCancellationReport(payload){
    return this._http.post(this.baseUrl + `v1/deviceApproval/admin/policyReport`, payload)
  }
  getSMSLog(){
    return this._http.get(this.baseUrl + `v1/deviceApproval/admin/smsRequest`)
  }
}
