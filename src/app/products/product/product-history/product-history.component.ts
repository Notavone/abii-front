import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../orders/dto/order";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../dto/product";
import {ProductsService} from "../../products.service";
import {OrdersService} from "../../../orders/orders.service";

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.scss']
})
export class ProductHistoryComponent implements OnInit {
  @Input() product?: Product;
  orders: Order[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductsService, private orderService: OrdersService) {
  }

  ngOnInit(): void {
    let id = this.route.parent?.snapshot.paramMap.get("id");
    if (!id) {
      return;
    }

    this.productService.getProduct(+id)
      .subscribe(product => {
        this.product = product;
        this.orderService.getOrders({productId: product.id, allowRefunded: true, allowIncomplete: true})
          .subscribe(orders => this.orders = orders);
      })
  }

  orderDeleted(event: Order) {
    this.orders = this.orders.filter(o => o.id !== event.id);
  }
}
