import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersData } from 'src/app/models/data.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router:Router) { }

  ngOnInit(): void {
    
  }

  usersData:UsersData;

  onSubmit(f: NgForm){
    this.usersData = f.form.value;
    console.log("vediamo se piglia i valori dal form",this.usersData);
    this.usersService.getEntry(this.usersData).subscribe(response => {
    console.log(response);
    this.router.navigate(['/dashboard']);
})
  }
}
