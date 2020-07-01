import { UsersData } from './../../models/data.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { CovidData } from 'src/app/models/data.model';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private usersService: UsersService, private router : Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  // public covidData: CovidData [];
  public usersData: UsersData [];

  getUsers(){
    // this.dataService.getData().subscribe( (response : any) => {
    //   this.covidData = response;
    // })

    this.usersService.getData().subscribe((answer: any) => {
        this.usersData = answer;
    })
  }

// changePermissions(){
//   this.usersService.editUser().subscribe((answer: any) => {
//     this.usersData = answer;
// })
// }

  goToDetails(id){
     this.router.navigateByUrl('/details/' + id);
   }

}
