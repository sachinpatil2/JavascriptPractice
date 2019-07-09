import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { RESTService } from '../services/rest.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  id: number;
  name: string;
  action: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<PeriodicElement>;
  // dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private httpClient: RESTService, private router: Router) { }

  ngOnInit() {
    this.httpClient.getEmployeeList().subscribe((data: PeriodicElement[]) => {
      this.dataSource = new MatTableDataSource(data);// data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (error) => {
      console.log(error);
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetail() {
    this.router.navigate(['empDetails']);
  }

}
