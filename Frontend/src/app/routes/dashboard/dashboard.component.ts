import { UsersData } from './../../models/data.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { CovidData } from 'src/app/models/data.model';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ApiCountry } from 'src/app/models/apiCountry.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private apiService: ApiService,private usersService: UsersService, private dataService: DataService, private router : Router) { }

  ngOnInit(): void {
    this.getUsers()
    this.getEntries()
  }

  public covidData: CovidData [];
  public usersData: UsersData [];
  //variabili di appoggio per il salvataggio dei dati Api su database
  countriesData: ApiCountry;
  array =[];

  getUsers(){
    this.usersService.getData().subscribe((answer: any) => {
        this.usersData = answer;
    })
  }

getEntries(){
  this.dataService.getData().subscribe( (response : any) => {
    this.covidData = response;
  })}

  goToDetails(id){
     this.router.navigateByUrl('/details/' + id);
   }

//Funzioni per ottenere i dati dall'Api e salvarli nel database
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
