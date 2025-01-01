import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  private productsInCart: IProduct[] = [];

  constructor(private cartSvc: CartService) {}
  ngOnInit() {
    console.log('Subscribed to cart');
    this.cartSvc.getCart().subscribe((products) => {
      console.log('Fetching cart');
      this.productsInCart = products;
      console.log('Products ' + products);
    });
  }

  get cartItems() {
    return this.productsInCart;
  }

  get cartTotal() {
    return this.productsInCart.reduce((prev, next) => {
      let discount =
        next.discount > 0 && next.discount > 0 ? 1 - next.discount : 1;
      return prev + next.price * discount;
    }, 0);
  }

  removeFromCart(product: IProduct) {
    this.cartSvc.remove(product);
  }

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return '/assets/images/robot-parts/' + product.imageName;
  }
}
