import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ValidateUserService } from 'src/app/service/validate-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email?: string;
  password?: string;

  constructor(
    private validateService: ValidateUserService,
    private authService: AuthService,
    public router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(): any {
    const user = {
      email: this.email,
      password: this.password,
    };

    if (!this.validateService.validateLogin(user)) {
      this.toastrService.show('Please fill in all values');
      return false;
    } else {
      this.authService.loginUser(user).subscribe((data) => {
        this.authService.storeUserData(data.token, data.email);
        console.log(data);
        this.router.navigate(['/']);
      });
    }
  }
}
