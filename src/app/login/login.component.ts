import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username: string;
  constructor(private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit() {
    const password = this.route.snapshot.paramMap.get('password');
    this.loginService.logUserIn(password);
  }

}
