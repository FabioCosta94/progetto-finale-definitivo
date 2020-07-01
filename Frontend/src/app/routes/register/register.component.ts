import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { UsersData } from '../../models/data.model';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }


  ngOnInit(): void { 
  }

usersEntry: UsersData

onSubmit(f: NgForm){
 this.usersEntry = f.form.value;
console.log("vediamo se piglia i valori dal form",this.usersEntry);
 this.usersService.addEntry(this.usersEntry).subscribe(response => {
      console.log("caricameli nel db please",response);
      this.router.navigate(['/dashboard']);
    })
}
}
