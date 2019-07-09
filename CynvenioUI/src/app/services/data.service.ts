import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  seletedPatient;
  currentCell: number = 0;
  currentCellTotal: number = 0;

  constructor() { }

  setPatient(patient) {
    this.seletedPatient = patient;
  }

  getPatient() {
    return this.seletedPatient;
  }

  getCurrentCell() {
    return this.currentCell;
  }

  setCurrentCell(cellIndex) {
    this.currentCell = cellIndex;
  }

  getTotalCell() {
    return this.currentCellTotal;
  }

  setTotalCell(totalCell:number){
    this.currentCellTotal = totalCell;
  }
}
