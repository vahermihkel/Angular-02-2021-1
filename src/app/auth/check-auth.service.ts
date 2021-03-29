import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService {
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService) { }

  autologin() {
    this.authService.autoLogin();
  }

  isLoggedIn() {
    let user = localStorage.getItem('userData');
    if (!user) {
      return false;
    } else {
      return true;
    }
  }
}
