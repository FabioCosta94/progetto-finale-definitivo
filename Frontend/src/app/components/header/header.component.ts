import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { LoginService } from '../../services/login.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usersService: UsersService, public login: LoginService) { }



  ngOnInit(): void {
  }


  logout() {
    this.login.logged = false;
    this.login.isAdmin=false;
    this.login.isPress=false;

  }


oppp


}
