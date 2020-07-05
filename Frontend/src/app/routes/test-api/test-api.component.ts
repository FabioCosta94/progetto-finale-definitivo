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

  allCountries: ApiCountry;



  ngOnInit() {
    this.getAllCountries();
  }

  getAllCountries() {
    this.apiService.getCountries().subscribe((data: ApiCountry) =>
      this.allCountries = { ...data },
      err => console.log(err),
      () => console.log("done loading countries", this.allCountries)
    );
  }


  saveCountries() {
    this.dataService.addCountries(this.allCountries).subscribe(response => {
      console.log("postandomeli", response);
    })
  }

}