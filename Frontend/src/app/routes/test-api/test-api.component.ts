import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ApiCountry } from '../../models/apiCountry.model';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestApiComponent implements OnInit {

  constructor(private apiService : ApiService) { }

  public countries;
  apiCountry : ApiCountry;
  italyData : ApiCountry;
  italyDataArray : Array<ApiCountry>=[];
  countryCode: string;
  showResult = false;
  singleCountryDataArray : Array<ApiCountry>=[];

  ngOnInit() {
    //this.getItaly();
  }

  getData(){
    this.getSingleCountry(this.countryCode);
    this.showResult=true;
  }

  getCountries(){
   /* this.apiService.getCountries().subscribe(
      data => {this.countries = {...data}},
      err => console.log(err),
      () => console.log("done loading countries", this.countries, 
      "JSON.stringify ", JSON.stringify(this.countries))
    );*/

    this.apiService.getCountries().subscribe((data: ApiCountry) =>
      this.apiCountry = {...data},
      err => console.log(err),
      () => console.log("done loading countries", this.apiCountry)
    );
  }

  getItaly(){
    this.apiService.getSpecificCountry("IT").subscribe((data: ApiCountry) =>
      {
        this.italyData = {...data};
        this.italyDataArray.push(this.italyData);
      },
      err => console.log(err),
      () => console.log("done loading italy countries", this.italyData, "array:", 
      this.italyDataArray)
  );
  }

  getSingleCountry(codeCountry: string){
    this.apiService.getSpecificCountry(codeCountry).subscribe((data: ApiCountry) =>
      {
        //facendo la push ovviamente aggiunge ogni entry all'array
        this.singleCountryDataArray.push({...data});
      },
      err => console.log(err),
      () => console.log("done loading specific countries", this.singleCountryDataArray)
  );
  }

}
