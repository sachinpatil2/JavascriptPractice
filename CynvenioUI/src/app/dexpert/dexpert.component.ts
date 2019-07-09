import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { ConfigService } from '../services/ConfigService';
declare var $: any;
declare var Magnifier: any;
declare var Event: any;
// var Magnifier;
// var Event;
// import * as $ from 'jquery';

@Component({
    selector: 'app-dexpert',
    templateUrl: './dexpert.component.html',
    styleUrls: ['./dexpert.component.css']
})
export class DexpertComponent implements OnInit, AfterViewInit {
    originalImage = {
        height: 2048,
        weight: 2448
    };
    baseUrl;
    selectedProb = 'ctc';
    selectedProbeCellsData = [];
    probs = [{
        value: 'ctc',
        viewValue: 'CTC'
    },
    {
        value: 'normal',
        viewValue: 'Normal'
    },
    {
        value: 'single_gain',
        viewValue: 'Single Gain'
    },
    {
        value: 'single_deletion',
        viewValue: 'Single Deletion'
    },
    {
        value: 'clump',
        viewValue: 'Clump'
    },
    {
        value: 'unclassified',
        viewValue: 'Unclassified'
    }
    ];
    selectedComment = 'comments1';
    comments = [];
    commentsProbe = [];

    selectedPatient;
    cellsData;
    logo: any;
    editBtnLabel = 'Edit';
    updateBtn = false;
    images = {
        dapi: '/assets/img/no-image-icon.png',
        combined: '/assets/img/no-image-icon.png',
        green: '/assets/img/no-image-icon.png',
        gold: '/assets/img/no-image-icon.png',
        aqua: '/assets/img/no-image-icon.png',
        red: '/assets/img/no-image-icon.png',
        global_dapi: '/assets/img/no-image-icon.png',
        globalDapiName: ''
    };
    activeCell = 0;
    formObj = {
        class: 'ctc',
        aqua: -1,
        red: -1,
        green: -1,
        gold: -1,
        expert_update: 0,
        comment: '',
        openComment: '',
        comment_aqua: '',
        comment_green: '',
        comment_gold: '',
        comment_red: '',
        reason_label: ''
    };
    currentDAPIPoints;
    patientID;
    magnifier: boolean = false;

    constructor(
        private http: HttpService,
        private data: DataService,
        private router: Router,
        private configService: ConfigService
    ) {
        this.patientID = localStorage.getItem('selectedPatient');
        this.baseUrl = configService.get('baseUrl');
        this.activeCell = data.getCurrentCell();
        this.getSelectedPatient();
    }

    ngOnInit() {
        console.log('inside ngOnInit');
        if (localStorage.getItem('dexpertSelectedProbe'))
            this.selectedProb = localStorage.getItem('dexpertSelectedProbe');
        else localStorage.setItem('dexpertSelectedProbe', 'ctc');
        this.getProbeCellsCount();
        this.getCommentList();
    }
    ngAfterViewInit() {
        console.log('inside ngAfterViewInit');
    }

    getCommentList() {
        this.http.getCommentList().subscribe((response: any) => {
            console.log(response);
            response.forEach(element => {
                let comment = {
                    value: element,
                    viewValue: element
                };
                this.comments.push(comment);
                this.commentsProbe.push(comment);
            });
            this.commentsProbe.pop();
        },
            (error: any) => {
                console.error(error);
            }
        );
    }

    drawReactangle() {
        let container = $('#container');
        let imageWidth = $('#globalDapi').width();
        let imageHeight = $('#globalDapi').height();
        let ratioHeight = this.originalImage.height / imageHeight;
        let ratioWidth = this.originalImage.weight / imageWidth;
        console.log(
            imageHeight + ':' + imageWidth + ':' + this.selectedProbeCellsData
        );
        let currentFileName = this.selectedProbeCellsData[this.activeCell];
        this.currentDAPIPoints,
            (currentFileName = currentFileName.substring(
                currentFileName.indexOf('_xmin')
            ));
        console.log(this.currentDAPIPoints);
        let xmin = currentFileName.substring(currentFileName.indexOf('_xmin') + 5, currentFileName.indexOf('_ymin'));
        let ymin = currentFileName.substring(currentFileName.indexOf('_ymin') + 5, currentFileName.indexOf('_xmax'));
        let xmax = currentFileName.substring(currentFileName.indexOf('_xmax') + 5, currentFileName.indexOf('_ymax'));
        let ymax = currentFileName.substring(currentFileName.indexOf('_ymax') + 5, currentFileName.indexOf('.png'));
        console.log(xmin + ':' + ymin + ':' + xmax + ':' + ymax + ':' + ratioHeight + ':' + ratioWidth);
        if ($('.child').length > 0) {
            console.log($('.child').length);
            $('.child').remove();
        }
        $('<div class="child"/>')
            .appendTo(container)
            .css('left', xmin / ratioWidth)
            .css('top', ymin / ratioHeight)
            .css('width', (xmax - xmin) / ratioWidth)
            .css('height', (ymax - ymin) / ratioHeight)
            .css('border', '1px solid ' + 'red');
    }

    getFormValues() {
        this.http.getFormValues(this.selectedPatient, this.selectedProbeCellsData[this.activeCell]).subscribe((response: any) => {
            console.info(response);
            this.formObj = response.result;
            this.formObj.aqua = parseInt(this.formObj.aqua + '');
            this.formObj.gold = parseInt(this.formObj.gold + '');
            this.formObj.green = parseInt(this.formObj.green + '');
            this.formObj.red = parseInt(this.formObj.red + '');
            //   this.formObj.reason_label = 'Exceptional cases handled (deletion of probes, deletion of satellites, etc.)';
            if (this.formObj.reason_label.startsWith('<br')) {
                this.formObj.reason_label = this.formObj.reason_label.substring(4);
            }
            // this.form
            // this.formObj.aqua = 1.0;
            // if(this.formObj.comment)
            let found: boolean = false;
            // if (!this.formObj.comment_aqua || this.formObj.comment_aqua == 'nan' || this.formObj.comment_aqua == 'undefined')
            //   this.formObj.comment_aqua = '';
            // if (!this.formObj. comment_gold || this.formObj.comment_gold == 'nan' || this.formObj.comment_gold == 'undefined')
            //   this.formObj.comment_gold = '';
            // if (!this.formObj.comment_green || this.formObj.comment_green == 'nan' || this.formObj.comment_green == 'undefined')
            //   this.formObj.comment_green = '';
            // if (!this.formObj.comment_red || this.formObj.comment_red == 'nan' || this.formObj.comment_red == 'undefined')
            //   this.formObj.comment_red = '';

            if (
                !this.formObj.comment ||
                this.formObj.comment == '' ||
                this.formObj.comment == 'nan' ||
                this.formObj.comment == 'undefined'
            )
                this.formObj.openComment = '';
            else {
                this.comments.forEach(element => {
                    if (element.value == this.formObj.comment) found = true;
                });
                if (!found) {
                    if (this.formObj.comment)
                        this.formObj.openComment = this.formObj.comment;
                    else this.formObj.openComment = '';
                    this.formObj.comment = 'Open Comment';
                }
            }
        },
            (error: any) => {
                console.error(error);
                this.formObj.aqua = -1;
                this.formObj.red = -1;
                this.formObj.green = -1;
                this.formObj.gold = -1;
                this.formObj.comment = '';
                this.formObj.comment_aqua = '';
                this.formObj.comment_gold = '';
                this.formObj.comment_green = '';
                this.formObj.comment_red = '';
            }
        );
    }

    updateFormValues() {
        console.log('inside updateFormValues method');

        this.editInfo();
        this.formObj.class = this.selectedProb;
        this.http.updateFormValues(this.selectedPatient, this.selectedProbeCellsData[this.activeCell], this.formObj)
            .subscribe(
                (response: any) => {
                    console.info(response);
                    this.showNotification('values are updated Successfully.', 'success');
                    this.getFormValues();
                },
                (error: any) => {
                    console.error(error);
                    this.showNotification('Error occurred. Please try again', 'warning');
                    this.getFormValues();
                }
            );
    }

    getSelectedPatient() {
        if (
            localStorage.getItem('selectedPatient') == null ||
            localStorage.getItem('selectedPatient') == undefined
        ) {
            this.router.navigate(['home']);
        } else {
            this.selectedPatient = localStorage.getItem('selectedPatient');
        }
    }

    getProbeCellsCount() {
        this.http.getProbeCellsCount(this.selectedPatient).subscribe(
            (response: any) => {
                console.info(response);
                this.cellsData = response.result;
                this.changeDataSource();
                if (this.cellsData[this.selectedProb].fileList.length == 0)
                    this.setDefaultImages();
                else this.setImages();
            },
            (error: any) => {
                console.log(error);
                this.setDefaultImages();
            }
        );
    }
    setDefaultImages() {
        for (let i = 0; i < Object.keys(this.images).length; i++) {
            this.images[Object.keys[i]] = '/assets/img/no-image-icon.png';
        }
    }
    editInfo() {
        if (this.editBtnLabel == 'Cancel') this.getFormValues();
        this.editBtnLabel = this.editBtnLabel == 'Cancel' ? 'Edit' : 'Cancel';
        this.updateBtn = !this.updateBtn;
    }

    onSelectedChange(e) {
        console.log(e.value);
        this.activeCell = 0;
        this.changeDataSource();
        localStorage.setItem('dexpertSelectedProbe', this.selectedProb);
        this.setSelectedCell();
    }

    changeDataSource() {
        console.log('inside changeDataSource' + this.selectedProbeCellsData.length);
        this.selectedProbeCellsData = this.cellsData[this.selectedProb].fileList;
        if (this.selectedProbeCellsData.length == 0) this.setDefaultImages();
        else this.setImages();
        this.getFormValues();
    }

    maxLengthCheck(value) {
        console.log(value);
        if (value > 21) {
            this.formObj.aqua = 21;
            console.log(this.formObj.aqua);
        }
    }

    isNumeric(evt) {
        console.log('inside isNumeric..');
        this.formObj.aqua = 21;
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    nextCell() {
        if (this.activeCell + 1 == this.selectedProbeCellsData.length)
            this.activeCell = 0;
        else this.activeCell += 1;
        this.setImages();
        this.getFormValues();
        // this.drawReactangle();
    }

    prevCell() {
        if (this.activeCell == 0)
            this.activeCell = this.selectedProbeCellsData.length - 1;
        else this.activeCell -= 1;
        this.setImages();
        this.getFormValues();
        // this.drawReactangle();
    }

    setSelectedCell() {
        let fileName = this.selectedProbeCellsData[this.activeCell];
        localStorage.setItem(
            'selectedCell',
            fileName.substring(0, fileName.indexOf('.png'))
        );
    }

    setImages() {
        let currentFileName = this.selectedProbeCellsData[this.activeCell];
        this.currentDAPIPoints = currentFileName.substring(
            currentFileName.indexOf('_xmin')
        );
        this.images.dapi = this.baseUrl + '/api/resources?file_name=output/' + this.selectedPatient + '/' + this.selectedProb + '/Dapi/' + currentFileName;
        this.images.combined = this.baseUrl + '/api/resources?file_name=output/' + this.selectedPatient + '/' + this.selectedProb + '/Combined/' + currentFileName;
        this.images.green = this.baseUrl + '/api/resources?file_name=output/' + this.selectedPatient + '/' + this.selectedProb + '/Green/' + currentFileName;
        this.images.gold = this.baseUrl + '/api/resources?file_name=output/' + this.selectedPatient + '/' + this.selectedProb + '/Gold/' + currentFileName;
        this.images.aqua = this.baseUrl + '/api/resources?file_name=output/' + this.selectedPatient + '/' + this.selectedProb + '/aqua/' + currentFileName;
        this.images.red = this.baseUrl + '/api/resources?file_name=output/' + this.selectedPatient + '/' + this.selectedProb + '/Red/' + currentFileName;
        this.images.global_dapi = this.baseUrl + '/api/resources?file_name=data/' + this.selectedPatient + '/FISH-CTC-ps20x/History/' + currentFileName.substring(0, currentFileName.indexOf('_xmin')) + '.jpg';
        this.images.globalDapiName = currentFileName.substring(0, currentFileName.indexOf('.'));
        console.log(
            this.selectedProbeCellsData[this.activeCell] +
            ':' +
            this.activeCell +
            ':' +
            this.images.global_dapi
        );
        this.drawReactangle();
    }

    goToZStack() {
        
        this.setSelectedCell();
        this.data.setCurrentCell(this.activeCell);
        this.data.setTotalCell(this.selectedProbeCellsData.length);
        this.router.navigate(['zstack']);
    }

    drawMagnifier() {
        return;
        $('.magnifier-preview').css('visibility', 'hidden');
        if ($('#thumb-large').length) {
            $('#thumb-large').remove();
        }
        var evt = new Event(),
            m = new Magnifier(evt);
        m.attach({
            thumb: '#thumb',
            large: this.images.red,
            largeWrapper: 'preview',
            zoom: 2,
            onthumbenter: () => {
                this.magnifier = true;
                $('.magnifier-preview').css('visibility', 'visible');
            },
            onthumbleave: () => {
                this.magnifier = false;
                $('.magnifier-preview').css('visibility', 'hidden');
            }
        });
    }

    showNotification(msg, type) {
        $.notify({
            icon: 'notifications',
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
            });
    }
}