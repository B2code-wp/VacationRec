import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  userData: any = null;
    private STORAGE_KEY = 'user';

  setUser(user: any) {
    this.userData = user;
  }
logout(): void {
  localStorage.removeItem(this.STORAGE_KEY);
  localStorage.removeItem('token');
}
  getUser() {
    return this.userData;
  }

  clearUser() {
    this.userData = null;
  }
}
