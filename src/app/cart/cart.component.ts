import { Component, Inject, OnInit } from '@angular/core';
import { IProduct } from '../catalog/IProduct.model';
import { CART_SERVICE_TOKEN, CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  private cart: IProduct[] = [];
  constructor(@Inject(CART_SERVICE_TOKEN) private cartService: CartService) { }

  ngOnInit() {
    this.cart = this.cartService.getCart()();
  }

  get cartItems() {
    return this.cartService.getCart()();
  }

  get cartTotal() {
    return this.cartService.getCart()().reduce((prev, next) => {
      let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
      return prev + next.price * discount;
    }, 0);
  }

  removeFromCart(product: IProduct) {
    this.cartService.remove(product);
  }

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return '/assets/images/robot-parts/' + product.imageName;
  }
}
