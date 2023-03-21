import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
      this.loginService.GetUser().pipe(tap(user => {
        if (user.permissions === 'Admin') {
          return true;
        } else {
          return false;
        }
      }));
      return true;
    }
}
