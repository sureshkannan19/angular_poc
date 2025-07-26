import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../catalog/product/product.service';
import { IProduct } from '../catalog/IProduct.model';
import { CART_SERVICE_TOKEN, CartService } from '../cart/cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products!: IProduct[];
  searchText = ''

  constructor(private productService: ProductService, @Inject(CART_SERVICE_TOKEN) private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products.filter((product: IProduct) => product.name.includes(this.searchText));
    })
  }

  getFilteredProducts(): IProduct[] {
    if (!this.searchText || this.searchText === '') {
      return this.products;
    }
    return this.products.filter((product: IProduct) => product.name.includes(this.searchText));
  }

  addToCart(product: IProduct) {
    this.cartService.add(product);
    // this.router.navigate(['/cart'])
  }

}
