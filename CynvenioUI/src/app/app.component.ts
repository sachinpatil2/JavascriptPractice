import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CynvenioPOC';

  constructor(private router: Router) {
    // console.log(this.router.url);
  }

  getState(){
    return this.router.url;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
