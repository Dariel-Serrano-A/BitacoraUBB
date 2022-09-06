import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Recordatorio} from '../models/Recordatorio'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordatoriosService {

  API_URI = 'http://127.0.0.1:1092/api'

  constructor(private http: HttpClient) { }

  getRecordatorios (){
    return this.http.get(`${this.API_URI}/recordatorio`);
  }

  getRecordatorio (id: String){
    return this.http.get(`${this.API_URI}/recordatorio/${id}`);
  }

  getPersonalData (id: String){
    return this.http.get(`${this.API_URI}/recordatorio/detail/${id}`);
  }

  deleteRecordatorios (id: String){
    return this.http.delete(`${this.API_URI}/recordatorio/${id}`);
  }

  saveRecordatorios (Recordatorios: Recordatorio){
    return this.http.post(`${this.API_URI}/recordatorio`,Recordatorios);
  }

  updateRecordatorios (id: String|number|undefined, updatedRecordatorios: Recordatorio): Observable <Recordatorio> {
    return this.http.put(`${this.API_URI}/recordatorio/${id}`,updatedRecordatorios);
  }
}
