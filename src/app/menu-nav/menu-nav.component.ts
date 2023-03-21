import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {
  isVisible = true;
  user: User = null;

  constructor(private loginService: LoginService, private userService: UserService) { }

  ngOnInit() {
     this.loginService.GetUser().subscribe(user => {
       console.log('nav init: ', user);
       this.user = user[0];
     });
  }
}
