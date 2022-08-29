import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Nota} from '../models/Nota'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  API_URI = 'http://127.0.0.1:1092/api'

  constructor(private http: HttpClient) { }

  getNotas (){
    return this.http.get(`${this.API_URI}/notas`);
  }

  getNota (id: String){
    return this.http.get(`${this.API_URI}/notas/${id}`);
  }

  getPersonalData (id: String){
    return this.http.get(`${this.API_URI}/notas/detail/${id}`);
  }

  deleteNotas (id: String){
    return this.http.delete(`${this.API_URI}/notas/${id}`);
  }

  saveNotas (Notas: Nota){
    return this.http.post(`${this.API_URI}/notas`,Notas);
  }

  updateNotas (id: String|number|undefined, updatedNotas: Nota): Observable <Nota> {
    return this.http.put(`${this.API_URI}/Notas/${id}`,updatedNotas);
  }
}
