import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserProfileService } from './http-clients/user-profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService,
    public userProfileService: UserProfileService) { }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  get getUserName() {
    var userName = this.authService.getUserName();
    if(userName) {
      return userName;
    } else {
      userName = this.authService.getEmail();
      if (userName) {
        return userName;
      }
    }
    return "";
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get getEmail() {
    return this.authService.getEmail();
  }

  getProfile() {
    this.userProfileService.getUserProfile().subscribe(
      result => {
        if(result.status == 200) {
          console.log(result.body);
        } else if(result.status == 204) {
          console.log("No existe el usuario.");
        } else {
          console.log("Error no identificado: " + result.status + " " + result.statusText);
        }
      },
      error => {
        console.log("Error: " + error.status + " " + error.statusText)
        // console.log(error.error);
      }
    );
  }
}
