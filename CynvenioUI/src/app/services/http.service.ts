import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './ConfigService';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl;
  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    this.baseUrl = configService.get('baseUrl');
  }

  getAllPatientID() {
    return this.httpClient.get(this.baseUrl + '/api/patients');
  }

  getDateProfile(id) {
    return this.httpClient.get(this.baseUrl + '/api/dataProfile/' + id);
  }

  startProcessing(id) {
    return this.httpClient.post(this.baseUrl + '/api/startProcessing/' + id, {});
  }

  getStats(id) {
    return this.httpClient.get(this.baseUrl + '/api/stats/' + id);
  }

  getProbeCellsCount(id) {
    return this.httpClient.get(this.baseUrl + '/api/probecellscount/' + id);
  }

  getStatus(id) {
    return this.httpClient.get(this.baseUrl + '/api/status/' + id);
  }

  getZStackImages(id, dexpertSelectedProb, selectedCell) {
    return this.httpClient.get(this.baseUrl + '/api/zstackimages/' + id + '/' + dexpertSelectedProb + '/' + selectedCell);
  }

  getFormValues(patientId, cellName) {
    return this.httpClient.get(this.baseUrl + '/api/probeReport/' + patientId + '/' + cellName);
  }

  updateFormValues(patientId, cellName, formObj) {
    let params = new HttpParams();

    //Begin assigning parameters
    params = params.append('class', formObj.class);
    params = params.append('aqua', formObj.aqua);
    params = params.append('gold', formObj.gold);
    params = params.append('green', formObj.green);
    params = params.append('red', formObj.red);

    params = params.append('comment_aqua', formObj.comment_aqua);
    params = params.append('comment_gold', formObj.comment_gold);
    params = params.append('comment_green', formObj.comment_green);
    params = params.append('comment_red', formObj.comment_red);
    
    if (formObj.comment == 'Open Comment')
      params = params.append('comment', formObj.openComment);
    else
      params = params.append('comment', formObj.comment);

    return this.httpClient.post(this.baseUrl + '/api/probeReport/' + patientId + '/' + cellName, {}, { params: params });
  }

  getCommentList() {
    return this.httpClient.get('/assets/commentList.json');
    // return this.httpClient.get('http://localhost:4200/assets/commentList.json');
  }

}
