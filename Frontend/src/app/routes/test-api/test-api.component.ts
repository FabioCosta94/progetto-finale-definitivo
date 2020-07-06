import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ApiCountry } from '../../models/apiCountry.model';
import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestApiComponent implements OnInit {


  constructor(private apiService: ApiService, private dataService: DataService) { }


  countriesData: ApiCountry;
  countriesDataArray: Array<ApiCountry> = [];

  // italyData: ApiCountry;
  // italyDataArray: Array<ApiCountry> = [];

  ngOnInit() {

  }

  getCountries() {
    this.apiService.getCountries().subscribe((data: ApiCountry) => {
      this.countriesData = { ...data };
      this.countriesDataArray.push(this.countriesData);
    },
      err => console.log(err),
      () => console.log("done loading countries", this.countriesData, "array:", this.countriesDataArray)

    );
  }

  // saveCountries() {
  //   for (let i = 0; this.countriesDataArray.length; i++) {
  //     this.dataService.addCountries(this.countriesDataArray[i].data.name && this.countriesDataArray[i].data.population &&
  //       this.countriesDataArray[i].data.latest_data.confirmed && this.countriesDataArray[i].data.latest_data.deaths &&
  //       this.countriesDataArray[i].data.latest_data.recovered &&
  //       this.countriesDataArray[i].data.latest_data.calculated.recovery_rate &&
  //       this.countriesDataArray[i].data.latest_data.calculated.death_rate &&
  //       this.countriesDataArray[i].data.updated_at).subscribe(response => {
  //         console.log(response);
  //       })
  //     }
  //   }




  saveCountries() {
    this.dataService.addCountries(this.countriesData).subscribe(res => {
      console.log("prova submit db", res);
    })
  }


  // getItaly() {
  //   this.apiService.getSpecificCountry("IT").subscribe((data: ApiCountry) => {
  //     this.italyData = { ...data };
  //     this.italyDataArray.push(this.italyData);
  //   },
  //     err => console.log(err),
  //     () => console.log("done loading italy countries", this.italyData, "array:",
  //       this.italyDataArray)
  //   );
  // }
  // saveItaly() {
  //   this.dataService.addCountries(this.italyData).subscribe(res => {
  //     console.log(res);
  //   })
  // }


}




