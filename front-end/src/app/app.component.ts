import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { UserProfileService } from './user-profile/user-profile.service';
import { UserProfile } from './user-profile/user-profile';
import { BroadcastService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private broadcastService: BroadcastService, private authService: AuthService,
    private userProfileService: UserProfileService) { }

  login() {
    this.authService.login();
  }

  logout() {
    this.userProfileService.cleanUserProfileCache();
    this.authService.logout();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get getUserNameFromADB2C() {
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

  get getUserName() {
    var userProfileCache = this.userProfileService.getUserProfileCache();
    if (userProfileCache) {
      return userProfileCache.name;
    }
    return "";
  }

  setUserProfileCache() {
    var email = this.authService.getEmail();
    if (!email) return;

    this.userProfileService.getUserProfile(email).subscribe(
      result => {
        if (result.status == 200) {
          var userProfile: UserProfile = { ...result.body };
          this.userProfileService.setUserProfileCache(userProfile);
        } else if (result.status == 204) {
          // Parte de esta lógia también se implementa en user-profile.component.ts,
          // si se hace un cambio acá, se debe validar si aplica allá.
          // El usuario no exite en la BD, entonces lo crea.
          // Nombre e email del userProfile = email.
          var userProfile = new UserProfile();
          userProfile.name = email;
          userProfile.email = email;
          userProfile.birthday = "1900-01-01"; // ----> falla sin no se pone fecha
          this.userProfileService.setUserProfile(userProfile.email, userProfile).subscribe(
            result => {
              // Guarda el usuario creado en el caché
              this.userProfileService.setUserProfileCache(userProfile);
            }
          );
        }
      }
    );
  }

  ngOnInit() {
    // Después de un inicio de sesión exitoso se carga la caché del perfil del usuario
    this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      this.setUserProfileCache();
    });

    if (this.authService.isLoggedIn())
      this.setUserProfileCache();
  }

  ngOnDestroy() {
    console.log("onDestroy");
    this.broadcastService.getMSALSubject().next(1);
  }
}
