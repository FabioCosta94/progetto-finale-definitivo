import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { LoginService } from '../../services/login.service';
import { LoginComponent } from '../../routes/login/login.component';
import { UsersData } from 'src/app/models/data.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usersService:UsersService,public login:LoginService,private loginComponent:LoginComponent) { }

  showDashboard=false;
  public usersData: UsersData[];
   public variabile =[];


  ngOnInit(): void {

  }

  // fetchEntry() {
  //   this.usersService.getData().subscribe((res: any) => {
  //     this.usersData = res;
  //     console.log("utenti", this.usersData);
  //   })
  // }

  
  logout(){
    this.login.logged = false;
    this.login.username ='';

  }

  AdminLogged(){

   if(this.variabile=this.loginComponent.currentUser){
     console.log("Variabile",this.variabile);
     this.showDashboard=true;
   }
   return this.showDashboard;
 }

}
