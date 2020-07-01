import { UsersData } from './../../models/users.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { CovidData } from 'src/app/models/data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private dataService: DataService, private router : Router) { }

  ngOnInit(): void {
    this.getEntries()
  }

  public covidData: CovidData [];
  public usersData: UsersData [];

  getEntries(){
    this.dataService.getData().subscribe( (response : any) => {
      this.covidData = response;
    })

    this.dataService.getData().subscribe((answer: any) => {
        this.usersData = answer;
    })
  }

  goToDetails(id){
    this.router.navigateByUrl('/details/' + id);
  }

}
