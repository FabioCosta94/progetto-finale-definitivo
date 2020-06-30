import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersData } from '../models/data.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = 'http://localhost:3000/users';

  constructor( private http : HttpClient) { }

  getData () {
    return this.http.get<Array<UsersData>>(this.baseUrl)
  }

  getUser( id ) {
    return this.http.get<UsersData>(this.baseUrl + "/" + id)
  }

  addUser = (data: UsersData) => {
    return this.http.post<UsersData>(this.baseUrl, {
      "username": data.username,
      "password": data.password,
      // "permissions": data.permissions
    });
  };

  deleteUser( id ){
    return this.http.delete(this.baseUrl + "/" + id)
  }

  editUser= (data: UsersData) => {
    return this.http.put(this.baseUrl + '/' + data.id, {
      "id": data.id,
      "username": data.username,
      "password": data.password,
      "permissions": data.permissions
    });
  };

  
}
