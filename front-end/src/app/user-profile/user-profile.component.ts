import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './user-profile';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  userProfile: UserProfile;
  userProfileForm: FormGroup;
  modalText;

  idTypes = [
    'Cédula de ciudadanía',
    'Cédula de extrangería',
    'NIT',
    'Número de pasaporte',
    'Tarjeta de identidad'
  ];

  constructor(private authService: AuthService,
    private userProfileService: UserProfileService, private formBuilder: FormBuilder,
    private modalService: NgbModal) {
    this.userProfileForm = this.createUserProfileForm();
  }

  get getEmail() {
    return this.authService.getEmail();
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
    this.userProfileForm.disable();
    var email = this.authService.getEmail();

    if (!email) {
      console.log("No se pasó el usuario. Revisar la información del idToken.");
      return;
    }

    this.userProfileService.getUserProfile(email).subscribe(
      result => {
        if (result.status == 200) {
          this.userProfile = { ...result.body };
          this.userProfileService.setUserProfileCache(this.userProfile);

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

          this.userProfileForm.enable();
        } else if (result.status == 204) {
          // Parte de esta lógia también se implementa en app.component.ts,
          // si se hace un cambio acá, se debe validar si aplica allá.
          // El usuario no exite en la BD, entonces lo crea.
          // Nombre e email del userProfile = email.
          this.userProfile = new UserProfile();
          this.userProfile.name = email;
          this.userProfile.email = email;
          this.userProfile.birthday = "1900-01-01"; // ----> falla sin no se pone fecha
          this.userProfileService.setUserProfile(this.userProfile.email, this.userProfile).subscribe(
            result => {
              // Guarda el usuario creado en el caché
              this.userProfileService.setUserProfileCache(this.userProfile);
            }
          );

          this.userProfileForm.enable();
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
    this.userProfileForm.disable();
    this.userProfile = {
      ...this.userProfileForm.value.aboutData,
      ...this.userProfileForm.value.addressData,
      ...this.userProfileForm.value.contactData
    };

    this.userProfileService.setUserProfile(this.userProfile.email, this.userProfile).subscribe(
      result => {
        this.userProfileService.setUserProfileCache(this.userProfile);
        // Informar en el formulario el envío exitoso
        this.modalText = "Tu información se actualizó correctamente";
        this.modalService.open(this.content, { centered: true }).result;
        this.userProfileForm.enable();
      },
      error => {
        console.log("Error: " + error.status + " " + error.statusText);
        // Informar en el formulario el envío fallido
        this.modalText = "Hubo un error actualizando tu información";
        this.modalService.open(this.content, { centered: true }).result;
        this.userProfileForm.enable();
      }
    );
  }

  ngOnInit() {
    this.prepopulateForm();
  }
}
