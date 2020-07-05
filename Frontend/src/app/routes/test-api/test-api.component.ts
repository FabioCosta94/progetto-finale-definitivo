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

 public  allCountries: ApiCountry[];
 public countries;
  apiCountry : ApiCountry;
  italyData : ApiCountry;
  italyDataArray : Array<ApiCountry>=[];
  countryCode: string;
  showResult = false;
  singleCountryDataArray : Array<ApiCountry>=[];



  ngOnInit() {
  
  }

  //  getAllCountries() {
  //    this.apiService.getCountries().subscribe((data: ApiCountry) =>
  //     this.allCountries = { ...data },
  //      err => console.log(err),
  //      () => console.log("done loading countries", this.allCountries)
  //    );
  //  }

  // getAllCountries() {
  //   this.apiService.getCountries().subscribe((response: any) => {
  //     this.allCountries = response;
  //     console.log("POBA",this.allCountries);
  //     let prova=this.allCountries[0].data.name;
  //   console.log("prova",prova);
  //   }
  //   );
    

  // }
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

  saveCountries() {
    // this.apiService.getCountries().subscribe((response: any) => {
    //   this.allCountries = response;
    //   console.log("POBA",this.allCountries);
    // }
    // );
    this.dataService.addCountries(this.italyData).subscribe(response => {
      console.log(response);
  
        })

  }




}
