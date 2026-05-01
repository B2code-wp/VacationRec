import { Component, inject, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { IonHeader } from '@ionic/angular/standalone';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  imports: [
    MatCard,
    MatIcon,
    IonHeader,
    RouterLink,
    MatToolbarModule],
})
export class ExploreComponent {
  isMenuOpen = false; //dropdown
  private router = inject(Router);

  // Mobile menu state
  menuOpen: boolean = false;

  // Toggle menu (better than inline logic)
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Close menu when navigating
  closeMenu(): void {
    this.menuOpen = false;
  }

  // Navigate with auto-close (clean UX)
  navigate(path: string): void {
    this.router.navigate([path]);
    this.closeMenu();
  }
}
