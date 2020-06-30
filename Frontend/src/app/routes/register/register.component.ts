import { UsersService } from '../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersData } from '../../models/data.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }


  ngOnInit(): void {
    
  }

usersEntry: UsersData;

onSubmit(f: NgForm){

  this.usersEntry = f.form.value;
  
    console.log("aaaa",this.usersEntry);
    
    this.usersService.addUser(this.usersEntry).subscribe(response => {
      console.log("prova",response);
      // this.router.navigate(['/dashboard']);
    })
}
}
