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

  ngOnInit(): void {
    
  }

  onSubmit(f: NgForm){
    this.usersEntry.username= f.form.value;
    this.usersEntry.password= f.form.value;
    this.usersEntry.permissions=1
    console.log("ngform",this.usersEntry);
    
  this.usersService.getUserDetails(this.usersEntry.username,this.usersEntry.password,this.usersEntry.permissions).subscribe(data => {
    console.log("bao",data);
  if(this.usersEntry.username==data.username&&this.usersEntry.password==data.password&&this.usersEntry.permissions==data.permissions){
  console.log("welcome,user")
    //  this.router.navigate(['/welcome']);
    }else{
      console.log("user doesn't exist")
    }
    
      })
  }
}

