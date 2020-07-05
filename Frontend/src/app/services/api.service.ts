import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCountry } from '../models/apiCountry.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http: HttpClient) { }

  private baseUrl ='https://corona-api.com'; //END POINT

  getCountries(){
    return this.http.get<ApiCountry>(`${this.baseUrl}/countries`);
  }

  getSpecificCountry(code: string){
    return this.http.get<ApiCountry>(`${this.baseUrl}/countries/`+code);
  }
}
