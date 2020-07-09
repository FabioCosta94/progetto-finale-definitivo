import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersData } from '../../models/data.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router, private loginservice: LoginService) { }

  public usersData: UsersData[];
  public usersEntry: UsersData;
  public currentUser: any;

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


    for (let i = 0; i < this.usersData.length; i++) {

      if (this.usersEntry.username == this.usersData[i].username &&
        this.usersEntry.password == this.usersData[i].password) {
        this.loginservice.logged = true
        console.log(this.usersEntry);
      
        if (this.usersData[i].permissions == 1) {
          this.currentUser = this.usersData[i]// variabile dove salva l'utente corrente(Admin)
          console.log("is Admin", this.currentUser);
          this.router.navigate(['/dashboard']);
        } else if (this.usersData[i].permissions == 2) {
          this.currentUser = this.usersData[i]// variabile dove salva l'utente corrente(Press)
          console.log("is Press");
          this.router.navigate(['/welcome']);
        } else{ (this.usersData[i].permissions != 1)
          this.currentUser = this.usersData[i]// variabile dove salva l'utente corrente(User)
          console.log("is User")
          this.router.navigate(['/welcome'])

        }
      }

    }

  }
}
