import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';

const routes: Route[] = [
  { path: 'home', component: HomeComponent, title: "Home - Joe's Robot Shop" },
  {
    path: 'catalog',
    component: CatalogComponent,
    title: "Catalog - Joe's Robot Shop",
  },
  { path: 'cart', component: CartComponent, title: "Cart - Joe's Robot Shop" },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}