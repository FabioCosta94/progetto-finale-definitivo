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
// saveCountries(data: ApiCountry) => {
//   return this.http.post<ApiCountry>(this.baseURL, {
    
//    "name" : data.name,
//     "population": data.population,
//     "confirmed" :data.confirmed,
//     "deaths":data.deaths,
//     "recovered":data.recovered,
//     "recovery_rate" : data.recovery_rate,
//     "death_rate":data.death_rate,
//     "updated_at ":data.updated_at
   
//   });
// };