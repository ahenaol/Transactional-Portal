import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './user-profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile;
  userProfileForm: FormGroup;

  idTypes = [
    'Cédula de ciudadanía',
    'Cédula de extrangería',
    'NIT',
    'Número de pasaporte',
    'Tarjeta de identidad'
  ];

  constructor(private authService: AuthService,
    private userProfileService: UserProfileService, private formBuilder: FormBuilder) {
    this.userProfileForm = this.createUserProfileForm();
  }

  createUserProfileForm() {
    return this.formBuilder.group({
      aboutData: this.formBuilder.group({
        email: [''],
        name: [''],
        idType: [''],
        idNumber: [''],
        birthday: ['']
      }),
      addressData: this.formBuilder.group({
        state: [''],
        city: [''],
        address: ['']
      }),
      contactData: this.formBuilder.group({
        homePhone: [''],
        cellPhone: ['']
      })
    });
  }

  prepopulateForm() {
    var email = this.authService.getEmail();

    if (!email) {
      console.log("No se pasó el usuario. Revisar la información del idToken.");
      return;
    }

    this.userProfileService.getUserProfile(email).subscribe(
      result => {
        if (result.status == 200) {
          this.userProfile = { ...result.body };

          this.userProfileForm.patchValue({
            aboutData: {
              email: this.userProfile.email,
              name: this.userProfile.name,
              idType: this.userProfile.idType,
              idNumber: this.userProfile.idNumber,
              birthday: this.userProfile.birthday
            },
            addressData: {
              state: this.userProfile.state,
              city: this.userProfile.city,
              address: this.userProfile.address
            },
            contactData: {
              homePhone: this.userProfile.homePhone,
              cellPhone: this.userProfile.cellPhone
            }
          });
        } else if (result.status == 204) {
          console.log("No existe el usuario.");
        } else {
          console.log("Error no identificado: " + result.status + " " + result.statusText);
        }
      },
      error => {
        console.log("Error: " + error.status + " " + error.statusText);
        // console.log(error.error);
      }
    );
  }

  onSubmit() {
    this.userProfile = {
      ...this.userProfileForm.value.aboutData,
      ...this.userProfileForm.value.addressData,
      ...this.userProfileForm.value.contactData
    };

    this.userProfileService.setUserProfile(this.userProfile.email, this.userProfile).subscribe(
      result => {
        console.log("Result: " + result.status);
        // Informar en el formulario el envío exitoso
      },
      error => {
        console.log("Error: " + error.status + " " + error.statusText);
        // Informar en el formulario el envío fallido
      }
    );
  }

  ngOnInit() {
    this.prepopulateForm();
  }
}
