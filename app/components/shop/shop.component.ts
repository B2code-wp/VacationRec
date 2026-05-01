import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { IonContent } from '@ionic/angular/standalone';

import { PLACES, Place, CartItem } from './shop.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    IonContent,
  ],
})
export class ShopComponent {

  constructor(private router: Router) {}

  /* ================= STATE ================= */
  isMenuOpen = false;

  searchTerm = '';
  selectedCountry = 'All';

  places: Place[] = PLACES.map(p => ({
    ...p,
    liked: p.liked ?? false,
    disliked: p.disliked ?? false,
    clicks: 0,
    addedToCart: 0
  }));

  filteredPlaces: Place[] = [];
  countries: string[] = [];

  cart: CartItem[] = [];
  total = 0;

  recommendedPlaces: Place[] = [];

  /* ================= INIT ================= */
  ngOnInit() {
    this.countries = ['All', ...new Set(this.places.map(p => p.country))];
    this.filterPlaces();
    this.generateRecommendations();
  }

  /* ================= MENU ================= */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.closeMenu();
  }

  /* ================= FILTER ================= */
  filterPlaces() {
    const search = this.searchTerm.toLowerCase();

    this.filteredPlaces = this.places
      .filter(p =>
        (p.name.toLowerCase().includes(search) ||
         p.country.toLowerCase().includes(search)) &&
        (this.selectedCountry === 'All' || p.country === this.selectedCountry)
      )
      .slice(0, 100);
  }

  trackByName(index: number, item: Place) {
    return item.name;
  }

  /* ================= LIKE / DISLIKE ================= */
  toggleLike(place: Place) {
    place.liked = !place.liked;

    if (place.liked) {
      place.disliked = false;
    }

    this.updateRecommendations();
  }

  toggleDislike(place: Place) {
    place.disliked = !place.disliked;

    if (place.disliked) {
      place.liked = false;
    }

    this.updateRecommendations();
  }

  /* ================= INTERACTIONS ================= */
  selectPlace(place: Place) {
    place.clicks = (place.clicks || 0) + 1;
    this.updateRecommendations();
  }

  addToCart(place: Place) {
    const existing = this.cart.find(i => i.name === place.name);

    if (existing) {
      existing.qty++;
    } else {
      this.cart.push({ ...place, qty: 1 });
    }

    place.addedToCart = (place.addedToCart || 0) + 1;

    this.updateTotal();
    this.updateRecommendations();
  }

  increase(item: CartItem) {
    item.qty++;
    this.updateTotal();
  }

  decrease(item: CartItem) {
    if (item.qty > 1) {
      item.qty--;
    } else {
      this.removeItem(item);
    }

    this.updateTotal();
  }

  removeItem(item: CartItem) {
    this.cart = this.cart.filter(i => i.name !== item.name);
    this.updateTotal();
  }

  /* ================= TOTAL ================= */
  updateTotal() {
    this.total = this.cart.reduce(
      (sum, i) => sum + (i.review * i.qty),
      0
    );
  }

  /* ================= RECOMMENDATION ENGINE ================= */
  updateRecommendations() {
    this.generateRecommendations();
  }

  generateRecommendations() {
    this.recommendedPlaces = this.places
      .map(p => ({
        ...p,
        score: this.calculateScore(p)
      }))
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 10);
  }

  calculateScore(place: Place): number {
    const ratingScore = (place.rating || 0) * 20;
    const reviewScore = place.review * 0.05;
    const clickScore = (place.clicks || 0) * 8;
    const cartScore = (place.addedToCart || 0) * 25;

    const likeBoost = place.liked ? 60 : 0;
    const dislikePenalty = place.disliked ? -80 : 0;

    return ratingScore + reviewScore + clickScore + cartScore + likeBoost + dislikePenalty;
  }


  /* ================= ACTIONS ================= */
  buyItems() {
    console.log(this.cart, this.total);
    this.cart = [];
    this.total = 0;
    this.router.navigate(['/payment']);
  }

  signOut() {
    this.router.navigate(['/home']);
  }
}
