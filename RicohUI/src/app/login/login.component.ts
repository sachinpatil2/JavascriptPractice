import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model : Object = {}
  constructor( private router : Router) { }

  ngOnInit() {
  }

  login(){
    console.log('inside login...');
    this.router.navigate(['dashboard']);
  }

}
