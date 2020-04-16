import { Component, OnInit } from '@angular/core';
import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-sms-log',
  templateUrl: './sms-log.component.html',
  styleUrls: ['./sms-log.component.css']
})
export class SmsLogComponent implements OnInit {
  data:any;
  constructor(private httpCallService:HttpCallService) { }
  ngOnInit() {
    this.getSMSLog();
  }

  getSMSLog(){
    this.httpCallService.getSMSLog().subscribe(
      (res) =>{
        this.data = res['payload'];
      },
      (err) =>{

      }
    )
  }
}
