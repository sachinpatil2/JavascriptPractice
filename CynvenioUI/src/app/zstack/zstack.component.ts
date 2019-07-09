import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ConfigService } from '../services/ConfigService';
declare var $: any;
declare function require(path: string);

@Component({
  selector: 'app-zstack',
  templateUrl: './zstack.component.html',
  styleUrls: ['./zstack.component.css']
})
export class ZstackComponent implements OnInit {

  baseUrl;

  selectedProb = 'aqua';
  dexpertSelectedProb = 'ctc';
  probs = [
    { value: 'aqua', viewValue: 'Aqua' },
    { value: 'gold', viewValue: 'Gold' },
    { value: 'green', viewValue: 'Green' },
    { value: 'red', viewValue: 'Red' }
  ];
  selectedComment = 'comments1';
  comments = [];
  commentsProbe = [];

  selectedPatient;
  selectedCell;
  logo: any;
  activeSliderId = 0;
  dataSource = [];
  selectedImage = 0;
  showNavigationArrows = true;
  showNavigationIndicators = false;

  editBtnLabel = 'Edit';
  updateBtn = false;
  indexValue;
  zStackData;
  formObj = {
    "class": 'ctc',
    "aqua": -1,
    "red": -1,
    "green": -1,
    "gold": -1,
    "expert_update": 0,
    "comment": '',
    "openComment": '',
    "comment_aqua": '',
    "comment_green": '',
    "comment_gold": '',
    "comment_red": ''
  };
  currentCell: number = 0;
  totalCell: number = 0;
  patientID;
  loading: boolean = false;
  loadingLabel = 'Please Wait. This may take a while to process.';

  constructor(config: NgbCarouselConfig, modalConfig: NgbModalConfig,
    private modalService: NgbModal, private http: HttpService, private data: DataService, private router: Router, private configService: ConfigService) {
    console.log('inside constructor Zstack Page.');
    this.patientID = localStorage.getItem('selectedPatient');
    this.baseUrl = configService.get('baseUrl');
    config.interval = -1;
    this.getSelectedPatient();
    this.getSelectedCell();
  }

  ngOnInit() {
    console.log('inside ngOnInit Zstack Page.');
    if (localStorage.getItem('dexpertSelectedProbe'))
      this.dexpertSelectedProb = localStorage.getItem('dexpertSelectedProbe');
    this.currentCell = this.data.getCurrentCell();
    this.totalCell = this.data.getTotalCell();
    this.getZStackImages();
    this.getFormValues();
    this.getCommentList();
  }

  getCommentList() {
    this.http.getCommentList().subscribe((response: any) => {
      console.log(response);
      response.forEach(element => {
        let comment = { value: element, viewValue: element }
        this.comments.push(comment); this.commentsProbe.push(comment);
      });
      this.commentsProbe.pop();
    }, (error: any) => {
      console.error(error);
    })
  }

  getSelectedCell() {
    if (localStorage.getItem('selectedCell') == null || localStorage.getItem('selectedCell') == undefined) {
      this.router.navigate(['dexpert']);
      // this.selectedCell = '11694_22216_1949730_xmin262_ymin838_xmax388_ymax950';
    }
    else {
      this.selectedCell = localStorage.getItem('selectedCell');
      // this.selectedCell = '11694_22216_1949730_xmin262_ymin838_xmax388_ymax950';
    }
  }

  getSelectedPatient() {
    if (localStorage.getItem('selectedPatient') == null || localStorage.getItem('selectedPatient') == undefined) {
      this.router.navigate(['home']);
    }
    else {
      this.selectedPatient = localStorage.getItem('selectedPatient');
    }
  }

  getZStackImages() {

    this.loading = true;
    this.dexpertSelectedProb = localStorage.getItem('dexpertSelectedProbe');
    this.http.getZStackImages(this.selectedPatient, this.dexpertSelectedProb, this.selectedCell).subscribe((response: any) => {
      console.log(response);
      this.loading = false;
      this.zStackData = response.result;
      let fileList = this.zStackData[this.selectedProb].fileList;
      for (let i = 0; i < this.zStackData[this.selectedProb].imagesCount; i++) {
        let obj = {
          "imagePath": this.baseUrl + "/api/resources?file_name=output/" + this.selectedPatient + "/" + this.dexpertSelectedProb + "/" + this.selectedProb + "/" + this.selectedCell + "/" + i + fileList[i].substr(fileList[i].indexOf('.'))
        }
        this.dataSource.push(obj);
      }
    }, (error: any) => {
      console.error(error);
      this.loading = false;
    })
  }
  changeDataSource() {
    this.dataSource = [];
    let fileList = this.zStackData[this.selectedProb].fileList;
    for (let i = 0; i < this.zStackData[this.selectedProb].imagesCount; i++) {
      let obj = {
        "imagePath": this.baseUrl + "/api/resources?file_name=output/" + this.selectedPatient + "/" + this.dexpertSelectedProb + "/" + this.selectedProb + "/" + this.selectedCell + "/" + i + fileList[i].substr(fileList[i].indexOf('.'))
      }
      this.dataSource.push(obj);
    }
  }

  cycleToSlide(slideId) {
    this.activeSliderId = slideId;
    this.selectedImage = slideId;
  }
  onSlideChange(e) {
    console.log(e.activeId);
    this.selectedImage = e.activeId;
    this.activeSliderId = e.activeId;
  }
  editInfo() {
    if (this.editBtnLabel == 'Cancel')
      this.getFormValues();
    this.editBtnLabel = this.editBtnLabel == 'Cancel' ? 'Edit' : 'Cancel';
    this.updateBtn = !this.updateBtn;
  }

  onInput(e) {
    console.log(e);
    this.activeSliderId = e.value - 1;
  }
  onSelectedChange(e) {
    console.log(e.value);
    this.changeDataSource();
  }
  getFormValues() {
    console.log('inside getFormValues method');
    this.http.getFormValues(this.selectedPatient, this.selectedCell + '.png').subscribe((response: any) => {
      console.info(response);
      this.formObj = response.result;
      let found: boolean = false;
      this.comments.forEach(element => {
        if (element.value == this.formObj.comment)
          found = true;
      });
      if (!found) {
        this.formObj.openComment = this.formObj.comment;
        this.formObj.comment = 'Open Comment';
      }

    }, (error: any) => {
      console.error(error);
      this.formObj.aqua = -1;
      this.formObj.red = -1;
      this.formObj.green = -1;
      this.formObj.gold = -1;
      this.formObj.comment = '';
    })
  }

  updateFormValues() {
    console.log('inside updateFormValues method');
    this.formObj.class = this.dexpertSelectedProb;
    this.http.updateFormValues(this.selectedPatient, this.selectedCell + '.png', this.formObj).subscribe((response: any) => {
      console.info(response);
      this.editInfo();
      this.showNotification('Values are updated.', 'success');
      this.getFormValues();

    }, (error: any) => {
      console.error(error);
      this.editInfo();
      this.showNotification('Error occurred. Please try again', 'warning');
      this.getFormValues();

    })
  }
  showNotification(msg, type) {
    $.notify({
      icon: "notifications",
      message: msg

    }, {
        type: type,
        timer: 100,
        placement: {
          from: 'bottom',
          align: 'center'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      })
  }
}