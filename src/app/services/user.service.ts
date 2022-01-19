import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User;

  constructor() { }

  public SetUser(user: User) {
    // console.log(user);
    this._user = user;
  }

  public GetUser(): User {
    // console.log('user service get user: ' + this._user);
    return this._user;
  }

  public GetUserName(): string {
    // console.log('user service GetUserName');
    // console.log(this._user);
    if (this._user) {
      // console.log(this._user);
      return this._user.name;
    }
    // console.log('returning empty string');
    return '';
  }
}
