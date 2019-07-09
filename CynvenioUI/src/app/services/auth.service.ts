import { Injectable } from '@angular/core';
// import { Http, Headers, Response } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  logout() {
    localStorage.removeItem("apiToken");
    // this._router.navigate(['/login']);
  }

  createAuthorizationHeader(user, headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa(user.username + ':' + user.password));
  }

  login(user) {

    console.log('in login method');
    let headers = new Headers();
    this.createAuthorizationHeader(user, headers);
  }

}
