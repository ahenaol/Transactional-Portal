import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MsalModule } from '@azure/msal-angular';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { UserProfileService } from './http-clients/user-profile.service';

import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [AppComponent, DashboardComponent, UserProfileComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    MsalModule.forRoot({
      clientID: '71dc04ab-73ed-4368-863e-4fa1550fe2fb',
      authority: 'https://login.microsoftonline.com/tfp/ahenaol.onmicrosoft.com/B2C_1_SiUpIn',
      cacheLocation: 'localStorage'
    },),
    AppRoutingModule
  ],
  providers: [AuthService, UserProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
