import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  products!: IProduct[];
  filter: string = '';
  // private cartService: CartService = inject(CartService);

  constructor(
    private cartService: CartService,
    private productSvc: ProductService
  ) {
    console.log('Creating CatalogComponent');
  }

  ngOnInit() {
    this.productSvc.getProducts().subscribe((products) => {
      console.log('Completed api call for /api/products API.');
      this.products = products;
    });
  }

  addToCart(product: IProduct) {
    this.cartService.add(product);
  }

  getFilteredProducts() {
    return this.filter.length > 0
      ? this.products.filter((p: any) => p.category === this.filter)
      : this.products;
  }
}
