import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username : string;
  logged : boolean;

constructor() { }

}
