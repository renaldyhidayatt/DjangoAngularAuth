import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/common/User';
import { AuthService } from 'src/app/service/auth.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public usersService: UsersService
  ) {}

  usersList?: Users[];
  loading = false;
  nyoba = localStorage.getItem('token');

  ngOnInit(): void {
    this.getUserAuth();
  }

  getUserAuth() {
    this.usersService.getAllUsers(this.nyoba).subscribe(
      (data) => {
        console.log(data);
        this.usersList = data;
      },
      (err) => console.log(err)
    );
  }
}
