import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor() {
    this.userProfileForm = this.createUserProfileForm();
  }

  createUserProfileForm() {
    return new FormGroup({
      aboutData: new FormGroup({
        email: new FormControl(),
        name: new FormControl(),
        idType: new FormControl(),
        idNumber: new FormControl(),
        birthday: new FormControl()
      }),
      addressData: new FormGroup({
        state: new FormControl(),
        city: new FormControl(),
        address: new FormControl(),
      }),
      contactData: new FormGroup({
        homePhone: new FormControl(),
        cellPhone: new FormControl()
      })
    });
  }

  ngOnInit() {
  }
}
