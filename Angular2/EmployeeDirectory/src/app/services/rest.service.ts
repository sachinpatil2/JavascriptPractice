import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RESTService {

  constructor(private httpClient: HttpClient) { }

  getEmployeeList() {
    return this.httpClient.get('/assets/empList.json');
  }

  getEmployeeDetails(id: number) {
    return this.httpClient.get('/assets/empList.json');
  }
  
}
