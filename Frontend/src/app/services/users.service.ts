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

  getEntry( id ) {
    return this.http.get<UsersData>(this.baseUrl + "/" + id)
  }

  addEntry = (data: UsersData) => {
    return this.http.post<UsersData>(this.baseUrl, {
      "username": data.username,
      "password": data.password,
      "permissions": data.permissions
    });
  };

  deleteEntry( id ){
    return this.http.delete(this.baseUrl + "/" + id)
  }

  editEntry = (data: UsersData) => {
    return this.http.put(this.baseUrl + '/' + data.id, {
      "id": data.id,
      "username": data.username,
      "password": data.password,
      "permissions": data.permissions
    });
  };

}
