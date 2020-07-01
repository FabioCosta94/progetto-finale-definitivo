import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { UsersData } from '../../models/data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

public usersentry: UsersData[];

  onSubmit(f: NgForm){
    console.log(f.value);
    console.log(f.valid);
  }
}

