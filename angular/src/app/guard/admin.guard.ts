import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private userService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  canActivate() {
    if (this.userService.currentUser.role == 1) {
      this.toastrService.success('You admin');
      return true;
    } else {
      this.toastrService.error('You are not authorized to view that page');
      this.router.navigate(['/']);

      return false;
    }
  }
}
