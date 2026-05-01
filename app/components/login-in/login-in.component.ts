import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { IonContent, IonHeader } from '@ionic/angular/standalone';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AuthService } from '../../service/Auth/auth-service';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderNavComponent } from "../../shared/header-nav/header-nav.component";
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-login-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    IonContent,
    MatProgressBarModule,
    FooterComponent,
    IonHeader,
    MatToolbar
],
  templateUrl: './login-in.component.html',
  styleUrls: ['./login-in.component.scss'],
})
export class LoginInComponent {
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    newsletter: [false],
  });

  hide = true;
  loading = false;
  submitted = false;
  errorMessage = '';
  isLoggedIn = false;
  isMenuOpen = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,

  ) {}

  // GETTERS
  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  // MENU
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
  // REVIEWS
  @ViewChild('reviewsGrid') reviewsGrid!: ElementRef<HTMLDivElement>;

  scrollLeft(): void {
    this.reviewsGrid.nativeElement.scrollBy({ left: -340, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.reviewsGrid.nativeElement.scrollBy({ left: 340, behavior: 'smooth' });
  }

  onCardHover(event: MouseEvent, rotateDeg: number): void {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = `translateY(-10px) rotate(${rotateDeg}deg)`;
    card.style.boxShadow = '0 24px 60px rgba(0,60,120,0.18)';
  }

  onCardLeave(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = '';
    card.style.boxShadow = '0 8px 32px rgba(0,60,120,0.10)';
  }

  // SUBMIT
  onSubmit(): void {
    this.submitted = true;

    // stop if form invalid
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.form.getRawValue();

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.isLoggedIn = true;

        const user = this.authService.getUser();
        console.log('Logged in user:', user);

        this.router.navigate(['/shop']);
      },

      error: (err) => {
        this.errorMessage = err.error?.msg || 'Invalid email or password';
        this.loading = false;
      },

      complete: () => {
        this.loading = false;
      },
    });
  }
}
