import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserProfile } from './user-profile';
import { AuthService } from '../auth.service';

@Injectable()
export class UserProfileService {
  userProfileCache: UserProfile;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserProfile(email): Observable<HttpResponse<UserProfile>> {
    return this.http.get<UserProfile>('/api/values/get?email=' + email,
      { observe: 'response' });
  }

  setUserProfile(email, body) {
    return this.http.put('/api/values/put?email=' + email, body,
      { observe: 'response' });
  }

  getUserProfileCache() {
    return this.userProfileCache;
  }

  setUserProfileCache(userProfile) {
    this.userProfileCache = userProfile;
  }

  cleanUserProfileCache() {
    this.userProfileCache = new UserProfile();
  }

  getUserName() {
    if (this.userProfileCache) {
      var name = this.userProfileCache.name;
      if (name == "") {
        return this.authService.getEmail();
      }
      return this.userProfileCache.name;
    }
    return "";
  }
}
