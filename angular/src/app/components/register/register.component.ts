import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ValidateUserService } from 'src/app/service/validate-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username?: string;
  email?: string;
  password?: string;
  password2?: string;

  constructor(
    private authService: AuthService,
    private validateServie: ValidateUserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): any {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      password2: this.password2,
    };

    if (!this.validateServie.validateRegister(user)) {
      this.toastrService.show('Please fill in all values');
      return false;
    } else {
      if (!this.validateServie.validatePassword(user)) {
        this.toastrService.show('Confirm Password did not match');
        return false;
      } else {
        this.authService.register(user).subscribe((data) => {
          console.log(data);
          this.toastrService.success('You are registred');
          this.router.navigate(['/login']);
        });
      }
    }
  }
}
