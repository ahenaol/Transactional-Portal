import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserProfile } from './user-profile';

@Injectable()
export class UserProfileService {
  userProfileCache: UserProfile;

  constructor(private http: HttpClient) { }

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
}
