import { CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.getAccesstoken()) {;
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['auth']);
      return false;
    }
  }
}