import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Bitacora} from '../models/Bitacora'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitacorasService {

  API_URI = 'http://127.0.0.1:1092/api'

  constructor(private http: HttpClient) { }

  getBitacoras (){
    return this.http.get(`${this.API_URI}/bitacoras`);
  }

  getBitacora (id: String){
    return this.http.get(`${this.API_URI}/bitacoras/${id}`);
  }

  getPersonalData (id: String){
    return this.http.get(`${this.API_URI}/bitacoras/detail/${id}`);
  }

  deleteBitacora (id: String){
    return this.http.delete(`${this.API_URI}/bitacoras/${id}`);
  }

  saveBitacora (bitacora: FormData){
    return this.http.post(`${this.API_URI}/bitacoras`,bitacora);
  }

  updateBitacora (id: String|number|undefined, updatedBitacora: FormData): Observable <Bitacora> {
    return this.http.put(`${this.API_URI}/bitacoras/${id}`,updatedBitacora);
  }

}
