import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, MultiDataSet, Color } from 'ng2-charts';
import { load } from '@angular/core/src/render3';
// import { MultiDataSet, Label } from 'ng2-charts';
import { HttpService } from '../services/http.service';
import { DataService } from '../services/data.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  patients = [];
  isMetaData: boolean = false;
  isStartProcessing: boolean = false;
  isGraphAvailable: boolean = false;
  selectedPatient;
  imagesCount: number = 0;
  completionStatus: number = 0;
  loading: boolean = false;

  //doughnutChart
  public doughnutChartLabels: Label[];
  public doughnutChartData;
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions;

  //bar-chart data
  public barChartOptions: ChartOptions;
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barcolors: Color[];

  public barChartData: ChartDataSets[];

  isToggleChart = true;
  stats: any = {};
  interval;
  loadingLabel = 'Please Wait. This may take a while to process';
  currentProcessingCount: number = 0;
  totalProcessingCount: number = 0;
  processingPercentCount: number = 0;


  constructor(private http: HttpService, private data: DataService) {
    // console.log();

  }

  ngOnInit() {
    console.log('inside ngonInit HomeComponent..');
    localStorage.clear();
    this.getAllPatientID();
    this.loadBarChart();
    this.loadDonutChart();
    console.log(window.location);
  }

  getAllPatientID() {
    this.http.getAllPatientID().subscribe((response: any) => {
      console.log(JSON.stringify(response));
      response.result.forEach(element => {
        this.patients.push({ value: element, viewValue: element })
      });

    }, (error: any) => {
      console.log(JSON.stringify(error));
    })
  }

  loadBarChart() {
    this.barChartLabels = ['Normal', 'CTC', 'Single Gain', 'Single Deletion'];
    this.barChartData = [
      { data: [517, 23, 121, 275] }
    ];
    this.barcolors = [{
      "backgroundColor": ['rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)']
    }];
    this.barChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: { xAxes: [{}], yAxes: [{}] },
      legend: {
        display: false,

      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };

  }

  loadDonutChart() {
    this.doughnutChartLabels = ['Normal', 'CTC', 'Single Gain', 'Single Deletion'];
    this.doughnutChartData = [
      [517, 23, 121, 275]
    ];
    this.doughnutChartOptions = {
      responsive: true,
      legend: {
        position: 'bottom',
      }
    };
  }
  toggleChart() {
    this.isToggleChart = !this.isToggleChart;
  }

  logout() {

  }

  startProcessing() {
    this.isStartProcessing = false;
    this.loading = true;

    // setTimeout(() => {
    this.getStatus();
    // }, 3000);

    this.interval = setInterval(() => {
      this.getStatus();
    }, 10000);

    this.http.startProcessing(this.selectedPatient).subscribe((response: any) => {
      console.log(response);
    }, (error: any) => {
      console.log(error);
    })
  }

  getStatus() {
    this.http.getStatus(this.selectedPatient).subscribe((response: any) => {
      if (response.result) {
        this.totalProcessingCount = response.result.total_count;
        this.currentProcessingCount = response.result.current_count;
        if (this.totalProcessingCount == 0)
          this.processingPercentCount = 0;
        else
          this.processingPercentCount = Math.ceil((this.currentProcessingCount / this.totalProcessingCount) * 100);
        if (this.processingPercentCount == 100)
          this.processingPercentCount = 99;
        if (response.result.complete) {
          this.loading = false;
          this.isGraphAvailable = true;
          this.getStats();
          clearInterval(this.interval);
        }
      }
    }, (error: any) => {

    })
  }

  getStats() {
    this.http.getStats(this.selectedPatient).subscribe((response: any) => {
      console.log(JSON.stringify(response));
      this.stats = response.result[0];
      this.barChartData[0].data = [this.stats.normal, this.stats.ctc, this.stats.single_gain, this.stats.single_deletion];
      this.doughnutChartData[0] = [this.stats.normal, this.stats.ctc, this.stats.single_gain, this.stats.single_deletion];
    }, (error: any) => {
      console.log(JSON.stringify(error));

    })
  }

  submitPatient() {

    this.data.setPatient(this.selectedPatient);
    localStorage.setItem('selectedPatient', this.selectedPatient);
    this.loading = false;
    if (this.interval)
      clearInterval(this.interval);
    this.getDataProfile();
  }

  getDataProfile() {
    this.http.getDateProfile(this.selectedPatient).subscribe((response: any) => {
      console.log(JSON.stringify(response));
      this.imagesCount = response.result[0].fileCount;
      this.completionStatus = response.result[0].processed;
      this.isMetaData = true;
      this.isStartProcessing = true;
      this.isGraphAvailable = false;

    }, (error: any) => {
      console.log(JSON.stringify(error));
      this.isMetaData = false;
      this.isStartProcessing = false;
      this.isGraphAvailable = false;
    })
  }

  cancelPatient() {

  }

}
