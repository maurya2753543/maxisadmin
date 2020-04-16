import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  responseMessage = {
    code: '',
    message: ''
  }
  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.loginForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
  }

  login(value) {
    this.spinner.show()
    this.loginService.getUser(value)
      .subscribe(
        (res) => {
          if (res.token && this.parseJwt(res.token)) {
            let response = this.parseJwt(res.token).permissionList;
            localStorage.setItem("UserDetails", JSON.stringify(response));
            this.spinner.hide();
            this.router.navigate(['requests']);
          }
          else {
            this.spinner.hide()
            this.responseMessage = {
              code: res.responseCode,
              message: res.responseMsg
            }
          }
        },
        (err) => {
          this.spinner.hide()
          this.responseMessage.message = "Something went wrong"
        })
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };



}
