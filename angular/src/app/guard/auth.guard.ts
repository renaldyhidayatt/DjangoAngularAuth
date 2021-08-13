import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  canActivate() {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.userService.logout();
      this.router.navigate(['/login']);

      this.toastrService.error('Please sign in');
      return false;
    }
  }
}
