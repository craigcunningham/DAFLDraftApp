import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {
  isVisible = true;
  user: User = null;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getEmitter().subscribe((user) => {
      this.user = user;
      this.ngOnInit();
    });
  }
}
