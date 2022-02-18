import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../shared/product";
import {NavigationLink} from "../../shared/navigation-link";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product?: Product;
  links: NavigationLink[] = [];
  activeLink: string = this.route.snapshot.url.join("/");

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    let id = "" + this.route.snapshot.paramMap.get("id");

    this.productService.getProduct(id)
      .subscribe(product => {
        this.product = product;
        let navigationLinks = [
          {path: `/products/${product._id}/params`, label: "Paramètres"},
          {path: `/products/${product._id}/history`, label: "Historique"},
        ];
        this.links = navigationLinks;
        if (!navigationLinks.map(l => l.path).includes(this.activeLink)) {
          this.activeLink = navigationLinks[0].path;
          this.router.navigate([navigationLinks[0].path]);
        }
      });
  }
}
