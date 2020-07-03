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

  public usersData: UsersData[];
  public usersEntry: UsersData;

  ngOnInit(): void {

    this.fetchEntry();
  }
  fetchEntry() {
    this.usersService.getData().subscribe((res: any) => {
      this.usersData = res;
      console.log("valori db:", this.usersData);
    })
  }

  onSubmit(f: NgForm) {
    this.usersEntry = f.form.value;

    console.log(this.usersEntry);

    for (let i = 0; i < this.usersData.length; i++) {
      if (this.usersEntry.username == this.usersData[i].username &&
        this.usersEntry.password == this.usersData[i].password) {
        console.log(this.usersEntry.username, " is logged in")
      } else
        console.log("users doesn't exist")
    }
  }
}


