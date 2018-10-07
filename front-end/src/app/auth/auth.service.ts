import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from './../../environments/environment';
import { User } from 'msal';

@Injectable()
export class AuthService {
  forgottenPassword : boolean

  constructor(private msalService : MsalService) {
    this.forgottenPassword = false;
  }

  login() {
    if(this.forgottenPassword) {
      this.msalService.authority = environment.auth.authorityPR;
      this.forgottenPassword = false;
    } else {
      this.msalService.authority = environment.auth.authoritySuSi;
    }

    this.msalService.loginPopup(environment.auth.b2cScopes)
    .catch(err => {
      if(err.indexOf('AADB2C90118') > -1) {
        // The user has forgotten their password
        this.forgottenPassword = true;
        this.login();
      } else if(err.indexOf('AADB2C90091') > -1) {
        // The user has cancelled entering self-asserted information
        this.login();
      } else {
        // console.error(err);
      }
    });
  }

  logout() {
    console.log("logout");
    this.msalService.logout();
  }

  get isLoggedIn(): boolean {
    if (this.msalService.getUser()) {      
      return true;
    }
    return false;
  }

  get getUserName(): string {
    var user = this.msalService.getUser();
    if (user) {
      return user.name;
    } else {
      return null;
    }
  }
}
