import { Injectable } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  constructor(private http: HttpClient) {
    this.http.get<IProduct[]>('api/cart').subscribe((c) => {
      this.cart.next(c);
    });
  }

  getCart(): Observable<IProduct[]> {
    return this.cart.asObservable();
  }

  add(product: IProduct) {
    const newCart = [...this.cart.getValue(), product];
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('Product added to cart : ' + product.name);
    });
  }

  remove(product: IProduct) {
    let newCart = this.cart.getValue().filter((c) => c.name !== product.name);
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('Removed ' + product.name + ' from cart!');
    });
  }
}
