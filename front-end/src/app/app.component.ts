import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { UserProfileService } from './user-profile/user-profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService,
    private userProfileService: UserProfileService) { }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get getUserName() {
    var userName = this.authService.getUserName();
    if (userName) {
      return userName;
    } else {
      userName = this.authService.getEmail();
      if (userName) {
        return userName;
      }
    }
    return "";
  }

  get getEmail() {
    return this.authService.getEmail();
  }
}
