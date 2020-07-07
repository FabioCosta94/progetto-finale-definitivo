import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ApiCountry, ApiCountryData } from '../../models/apiCountry.model';
import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestApiComponent implements OnInit {


  constructor(private apiService: ApiService, private dataService: DataService) { }

  countriesData: ApiCountry;
  array =[];
 
  ngOnInit() {
  }

  getCountries() {
    this.apiService.getCountries().subscribe((data: ApiCountry) => {
      this.countriesData = { ...data };
      this.array.push(this.countriesData.data);
    },
      err => console.log(err),
      () => console.log("done loading countries", this.countriesData, "array:", this.array)
    );
  }

  saveCountries() {
    for (let i = 0; this.array.length; i++) {
      for(let j=0;this.array.length;j++){
      this.dataService.addCountries(this.array[i][j]).subscribe(response => {
        console.log(response);
      })
    }
  }
  }







}




