import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { UserProfileService } from '../http-clients/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
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
          // console.log(result.body);
          this.userProfileForm.patchValue({
            aboutData: {
              email: result.body.email,
              name: result.body.name,
              idType: result.body.idType,
              idNumber: result.body.idNumber,
              birthday: result.body.birthday
            },
            addressData: {
              state: result.body.state,
              city: result.body.city,
              address: result.body.address
            },
            contactData: {
              homePhone: result.body.homePhone,
              cellPhone: result.body.cellPhone
            }
          });
        } else if (result.status == 204) {
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

  onSubmit() {
    this.userProfileService.setUserProfile();
  }

  ngOnInit() {
    this.prepopulateForm();
  }
}
