import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUrl:any;
  constructor(private _router:Router){
  }
  ngOnInit() {
   this.currentUrl =  window.location.href; 
  }
}
