import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../service/Auth/auth-service';
import { FooterComponent } from "../../../shared/footer/footer.component";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbar,
    FooterComponent
],
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  private router = inject(Router);

  isMenuOpen = false; //dropdown
  hidePassword = true;
  registerForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  loading = false;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private authService: AuthService,

  ) {}


  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', Validators.required],
        rememberMe: [false],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // PASSWORD MATCH VALIDATOR
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { mismatch: true };
  }

  //dropdown manu
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  //  SUBMIT
  onSubmit() {
  this.submitted = true;
  if (this.registerForm.invalid) return;

  this.loading = true;
  this.errorMessage = '';

  const formData = this.registerForm.getRawValue();

  this.authService.register(formData).subscribe({
    next: () => {
      // store user locally
      this.authService.setUser({
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
      });

      // auto login
      this.authService.login({
        email: formData.email,
        password: formData.password,
      }).subscribe({
        next: () => {
          this.router.navigate(['/shop']);
        },
        error: (err: any) => {
          this.errorMessage = 'Login after register failed';
        },
        complete: () => {
          this.loading = false;
        }
      });
    },
    error: (err: HttpErrorResponse) => {
      this.loading = false;
      this.errorMessage = err.error?.msg || 'Registration failed';
    }
  });
}

  //  MODAL ACTIONS
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const { name, surname, email, password } =
      this.registerForm.getRawValue();

    return this.modalCtrl.dismiss(
      { name, surname, email, password },
      'confirm'
    );
  }
}
