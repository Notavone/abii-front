import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../business/products/products.service';
import {Product} from "../../business/products/dto/product";
import {ProductType} from "../../business/products/product-type";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products.filter(p => p.type === ProductType.PRODUCT_FOOD && p.sellable);
        this.isLoading = false;
      });
  }

}
