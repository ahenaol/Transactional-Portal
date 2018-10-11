import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { UserProfileService } from './user-profile/user-profile.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

export const protectedResourceMap: [string, string[]][] = [
  ['/api/values/', ['https://ahenaol.onmicrosoft.com/bff/user_impersonation']]
];

@NgModule({
  declarations: [AppComponent, DashboardComponent, UserProfileComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    MsalModule.forRoot({ // TODO: tomar esto de las variables de entorno
      clientID: '71dc04ab-73ed-4368-863e-4fa1550fe2fb',
      authority: 'https://login.microsoftonline.com/tfp/ahenaol.onmicrosoft.com/B2C_1_SiUpIn',
      redirectUri: 'http://localhost:4200/',
      cacheLocation: 'localStorage',
      postLogoutRedirectUri: 'http://localhost:4200/',
      // unprotectedResources: ["https://www.microsoft.com/en-us/"],
      protectedResourceMap: protectedResourceMap
    }),
    AppRoutingModule
  ],
  providers: [AuthService, UserProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
