import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
  forgottenPassword: boolean

  constructor(private msalService: MsalService) {
    this.forgottenPassword = false;
  }

  login() {
    if (this.forgottenPassword) {
      this.msalService.authority = environment.auth.authorityPR;
      this.forgottenPassword = false;
    } else {
      this.msalService.authority = environment.auth.authoritySuSi;
    }

    this.msalService.loginPopup(environment.auth.b2cScopes)
      .catch(err => {
        if (err.indexOf('AADB2C90118') > -1) {
          // The user has forgotten their password
          this.forgottenPassword = true;
          this.login();
        } else if (err.indexOf('AADB2C90091') > -1) {
          // The user has cancelled entering self-asserted information
          this.login();
        } else {
          // console.error(err);
        }
      });
  }

  logout() {
    this.msalService.logout();
  }

  isLoggedIn() {
    if (this.msalService.getUser()) {
      return true;
    }
    return false;
  }

  getEmail() {
    var user = this.msalService.getUser();
    if (user) {
      if (user.idToken.hasOwnProperty("emails")) {
        return user.idToken["emails"][0];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  getUserName() {
    var user = this.msalService.getUser();
    if (user) {
      return user.name;
    } else {
      return null;
    }
  }
}
