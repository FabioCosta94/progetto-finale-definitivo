import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersData } from '../models/data.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL = 'http://localhost:3000/users';

 

  constructor( private http : HttpClient) { }

  getData () {
    return this.http.get<Array<UsersData>>(this.baseURL)
  }

  getUser( id ) {
    return this.http.get<UsersData>(this.baseURL + "/" + id)
  }

  // getUserDetails (username,password,permissions){
  //   return this.http.get<UsersData>(this.baseURL,{
  //     username,
  //     password,
  //     permissions
  //   })
  // }



  register = (user: UsersData) => {
    return this.http.post<UsersData>(this.baseURL, {
      "username": user.username,
      "password": user.password,
      "permissions": user.permissions
    });
  };

  deleteUser( id ){
    return this.http.delete(this.baseURL + "/" + id)
  }

  editUser= (user: UsersData) => {
    return this.http.put(this.baseURL + '/' + user.id, {
      "id": user.id,
      "username":user.username,
      "password": user.password,
      "permissions": user.permissions
    });
  };

  
}
