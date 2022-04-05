import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = environment.apiUrl + 'User';

  // user: User = {
  //   name: 'user',
  //   password: '123',
  //   team: 1,
  //   permissions: ['Team']
  // };

  // admin: User = {
  //   name: 'admin',
  //   password: '456',
  //   team: 2,
  //   permissions: ['Admin']
  // };

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService: UserService, private http: HttpClient, private route: Router) { }

  logUserIn(password: string): void {
    const url = `${this.loginUrl}/${password}`;
    let u: User;
    u = new User();
    u.name = 'But Justice';
    u.team = 1;
    u.permissions = 'Admin';
    this.processLogin(u);
    // this.http.get<User>(url).subscribe(u => this.processLogin(u[0]));
  }
  processLogin(user: User) {
    if (user.permissions === 'Admin') {
      this.route.navigateByUrl('/dafldraft');
    } else if (user.permissions === 'Team') {
      this.route.navigateByUrl('/my-protection-list');
    } else {
      throw false;
    }

    this.userService.SetUser(user);
    this.fireIsLoggedIn.emit(user);
    // return this.userService.GetUserName();
  }
  getEmitter() {
    return this.fireIsLoggedIn;
  }
}
