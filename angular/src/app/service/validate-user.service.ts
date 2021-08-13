import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidateUserService {
  constructor() {}

  validateRegister(user: any) {
    if (
      user.username == undefined ||
      user.email == undefined ||
      user.password == undefined ||
      user.password2 == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateLogin(user: any) {
    if (user.email == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validatePassword(user: any) {
    if (user.password != user.password2) {
      return false;
    } else {
      return true;
    }
  }
}
