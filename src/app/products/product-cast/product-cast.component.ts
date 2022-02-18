import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Product} from "../shared/product";

@Component({
  selector: 'app-product-cast',
  templateUrl: './product-cast.component.html',
  styleUrls: ['./product-cast.component.scss']
})
export class ProductCastComponent implements OnChanges {
  @Input() id: string = "";
  product?: Product;

  constructor(private productService: ProductService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productService.getProduct(this.id)
      .subscribe(product => this.product = product);
  }
}
