import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  products!: IProduct[];
  filter: string = '';
  // private cartService: CartService = inject(CartService);

  constructor(
    private cartService: CartService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('Creating CatalogComponent');
  }

  ngOnInit() {
    console.log('Inside CatalogComponent ');
    this.productSvc.getProducts().subscribe((products) => {
      console.log('Completed api call for /api/products API.');
      this.products = products;
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    });
  }

  addToCart(product: IProduct) {
    this.cartService.add(product);
    this.router.navigate(['/cart']);
  }

  getFilteredProducts() {
    console.log('CatalogComponent Filter : ' + this.filter);
    return this.filter.length > 0
      ? this.products.filter((p: any) => p.category === this.filter)
      : this.products;
  }
}
