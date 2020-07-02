import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersData } from '../../models/data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }

usersEntry: UsersData;
 public dbData:UsersData [];

  ngOnInit(): void {

    this.fetchEntry();
    console.log("db",this.dbData);
  }


  fetchEntry(){
    this.usersService.getData().subscribe( (res: any ) => {
      this.dbData = res;
    })
  }





  onSubmit(f: NgForm){
    this.usersEntry = f.form.value;
    console.log(this.usersEntry);
    this.usersEntry.permissions=1&&2&&3
    console.log("ngform",this.usersEntry);
    
//  this.usersEntry.password&&this.usersEntry.

  }
}
