import { Component, Inject, inject } from '@angular/core';
import { IProduct } from './IProduct.model';
import { CART_SERVICE_TOKEN, CartService } from '../cart/cart.service';
import { ProductService } from './product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  products: Observable<IProduct[]> = this.productService.getProducts();
  cart: IProduct[] = [];
  filter: string = '';
  // private cartService: CartService = inject(CartService);

  constructor(
    @Inject(CART_SERVICE_TOKEN) private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    // this.route.queryParams.subscribe((param) => {
    //   this.filter = param['filter'] ?? '';
    // });
  }

  // getFilteredProducts(): IProduct[] {
  //   if (!this.filter || this.filter === '') {
  //     return this.products;
  //   }
  //   return this.products.filter((product: any) =>
  //     product.category === this.filter
  //   );
  // }

  addToCart(product: IProduct) {
    this.cartService.add(product);
    // this.router.navigate(['/cart'])
  }
}
