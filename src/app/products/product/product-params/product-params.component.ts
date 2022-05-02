import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../products.service';
import {ProductType} from "../../../shared/product-type";
import {ProductCreateDto} from "../../dto/product-create.dto";
import {ConfirmService} from "../../../features/confirm/confirm.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-product-params',
  templateUrl: './product-params.component.html',
  styleUrls: ['./product-params.component.scss']
})
export class ProductParamsComponent implements OnInit {
  id!: number;
  productDto!: ProductCreateDto;
  productType = ProductType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private confirmService: ConfirmService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    let id = this.route.parent?.snapshot.paramMap.get("id");
    if (!id) {
      return
    }

    this.productService.getProduct(+id)
      .subscribe(product => {
        this.id = product.id;
        this.productDto = {
          name: product.name,
          type: product.type,
          price: product.price,
          price_red: product.price_red,
          available: product.available,
        }
      });
  }


  goBack() {
    return this.location.back();
  }

  update() {
    this.productService.updateProduct(this.id, this.productDto)
      .subscribe(_ => this.goBack());
  }

  delete() {
    this.confirmService.open({
      title: "Supprimer un produit",
      message: "Êtes-vous sûr de vouloir supprimer ce produit ?",
      onConfirm: () => this.productService.deleteProduct(this.id)
        .subscribe(_ => this.goBack())
    })
  }
}
