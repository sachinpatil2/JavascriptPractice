import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading: boolean = false;
  error: boolean = false;
  errorMsg;
  
  constructor(private router: Router) {
    if (localStorage.getItem('jwtToken'))
      this.router.navigate(['home']);
  }

  ngOnInit() {

  }

  login() {
    console.log('login');
    if (this.model.username == 'test' && this.model.password == 'test')
      this.router.navigate(['home']);

  }

}


