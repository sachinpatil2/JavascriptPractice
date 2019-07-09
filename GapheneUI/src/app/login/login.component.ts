import {AuthenticateService} from "./loginService/authenticate.service";
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [AuthenticateService]
})

export class LoginComponent {
    model: any = {};
    loading = false;
    returnUrl: string;
    error = true;

    constructor(
      private authenticationService: AuthenticateService,
      private route: ActivatedRoute,
      private router: Router) { }

    login() {
        console.log('login');
        this.loading = true;
        this.error = this.authenticationService.login(this.model);
        console.log('error: ' + this.error);
        this.loading = false;

    }
  }
