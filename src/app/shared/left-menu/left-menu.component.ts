import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})

export class LeftMenuComponent implements OnInit {
  currentUrl: string;
  featureList: any;
  userName:string;
  shortUserName:any;
  constructor(private router: Router) { }
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('UserDetails'));
    this.userName = user.name;
    this.shortUserName = this.userName.split(" ");
    this.featureList = user.featureList
    this.currentUrl = this.router.url;
  }

  showPendingRequest(component) {
    let val = false;
    this.featureList.forEach(item => {
      if (item['featureCode'] == component) {
        val = true;
        return val;
      }
    });
    return val;
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