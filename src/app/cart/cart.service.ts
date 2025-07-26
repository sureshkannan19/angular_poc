import { Injectable, InjectionToken, signal } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { IProduct } from '../catalog/IProduct.model';

export const CART_SERVICE_TOKEN = new InjectionToken<CartService>("CartService");
type CartOptions = {
  persistenceType: string
  persistenceKey: string
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<IProduct[]>([]);
  private cartOptions: CartOptions = {
    persistenceType: 'local',
    persistenceKey: 'Cart'
  }

  constructor() {
    if (this.cartOptions && this.cartOptions.persistenceType === 'local') {
      const cartString = localStorage.getItem(this.cartOptions.persistenceKey);
      const products = cartString ? JSON.parse(cartString) as IProduct[] : [];
      this.cartItems.set(products);
    }
  }

  getCart() {
    return this.cartItems.asReadonly();
  }

  add(product: IProduct) {
    this.cartItems.update((oldCart) => [...oldCart, product]);
    this.storeCart();
  }

  remove(product: IProduct) {
    this.cartItems.update((oldCart) => oldCart.filter(i => i !== product));
    this.storeCart();
    // this.http.post('/api/cart', newCart).subscribe(() => {
    //   console.log('removed ' + product.name + ' from cart!');
    // });
  }

  private storeCart() {
    if (this.cartOptions && this.cartOptions.persistenceType === 'local') {
      localStorage.setItem(this.cartOptions.persistenceKey, JSON.stringify(this.cartItems()))
    }
  }

}
