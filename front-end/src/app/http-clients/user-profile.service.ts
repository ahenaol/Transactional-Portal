import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<HttpResponse<any>> {
    return this.http.get<any>('/api/values/get?email=alejo@gmail.com',
      { observe: 'response' });
  }
}
