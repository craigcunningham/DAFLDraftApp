import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { debug } from 'util';

import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = environment.apiUrl + 'User';

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService: UserService, private http: HttpClient, private route: Router) { }

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private _user: User = null;

  logUserIn(password: string): Observable<User> {
    if (password === '') {
      console.log('getting password from local storage');
      password = localStorage.getItem(this.JWT_TOKEN);
    } else {
      localStorage.setItem(this.JWT_TOKEN, password);
      console.log('password found');
    }
    console.log('logUserIn: ' + password);
    const url = `${this.loginUrl}/${password}`;
    return this.http.get<User>(url).pipe(tap(u => this.processLogin(u[0])));
  }

  processLogin(user: User) {
    console.log('processLogin', user);
    this.userService.SetUser(user);
    this.fireIsLoggedIn.emit(user);

    if (user.permissions === 'Admin') {
      this.route.navigateByUrl('/dafldraft');
    } else if (user.permissions === 'Team') {
      const date = new Date();
      if (date.getMonth() > 2 || (date.getDate() > 19 && date.getMonth() === 2)) {
        this.route.navigateByUrl('/rosters/' + user.team);
      } else {
        this.route.navigateByUrl('/my-protection-list/' + user.team);
      }
    } else {
     throw false;
    }
  }
  public GetUser(): Observable<User> {
    if (this._user === null) {
      console.log('GetUser user is null');
      return this.logUserIn('');
    } else {
      console.log('GetUser', this._user);
      this.processLogin(this._user);
    }
    console.log('GetUser', this._user);
    return of(this._user);
  }
  getEmitter() {
    return this.fireIsLoggedIn;
  }
}
