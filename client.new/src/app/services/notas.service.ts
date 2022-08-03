import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Notas} from '../models/Notas'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  API_URI = 'http://localhost:1092/api'

  constructor(private http: HttpClient) { }

  getNotas (){
    return this.http.get(`${this.API_URI}/Notas`);
  }

  getNota (id: String){
    return this.http.get(`${this.API_URI}/Notas/${id}`);
  }

  getPersonalData (id: String){
    return this.http.get(`${this.API_URI}/Notas/detail/${id}`);
  }

  deleteNotas (id: String){
    return this.http.delete(`${this.API_URI}/Notas/${id}`);
  }

  saveNotas (Notas: Notas){
    console.log("API/INSERT");
    console.log(Notas);
    return this.http.post(`${this.API_URI}/Notas`,Notas);
  }

  updateNotas (id: String|number|undefined, updatedNotas: Notas): Observable <Notas> {
    console.log("API/update");
    console.log(updatedNotas);
    return this.http.put(`${this.API_URI}/Notas/${id}`,updatedNotas);
  }
}
