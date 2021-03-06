
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CovidData } from '../models/data.model';
import { ApiCountry, ApiCountryData } from '../models/apiCountry.model';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL = 'http://localhost:3000/data';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<Array<CovidData>>(this.baseURL)
  }

  getEntry(id) {
    return this.http.get<CovidData>(this.baseURL + "/" + id)
  }

  addEntry = (data: CovidData) => {
    return this.http.post<CovidData>(this.baseURL, {
      "country": data.country,
      "population": data.population,
      "cases": data.cases,
      "deaths": data.deaths,
      "recoveries": data.recoveries,
      "recoveryRate": data.recoveryRate,
      "fatalityRate": data.fatalityRate,
      "date": data.date
    });
  };

  addCountries = (data: ApiCountryData) => {
    return this.http.post<ApiCountryData>(this.baseURL, {

      "country": data.name,
      "population": data.population,
      "cases": data.latest_data.confirmed,
      "deaths": data.latest_data.deaths,
      "recoveries": data.latest_data.recovered,
      "recoveryRate": data.latest_data.calculated.recovery_rate,
      "fatalityRate": data.latest_data.calculated.death_rate,
      "date": data.updated_at
    });
  };



  deleteEntry(id) {
    return this.http.delete(this.baseURL + "/" + id)
  }

  editEntry = (data: CovidData) => {
    return this.http.put(this.baseURL + '/' + data.id, {
      "id": data.id,
      "country": data.country,
      "population": data.population,
      "cases": data.cases,
      "deaths": data.deaths,
      "recoveries": data.recoveries,
      "recoveryRate": data.recoveryRate,
      "fatalityRate": data.fatalityRate,
      "date": data.date
    });
  };

}
