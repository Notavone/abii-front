import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../products/products.service";
import { forkJoin } from "rxjs";
import { Product } from "../../products/dto/product";
import { ProductCategory } from "../../products/dto/product-category";
import { OrderLineCreateDto } from "../dto/order-line-create.dto";
import { AuthService } from "../../auth/auth.service";
import { MatProgressBar } from "@angular/material/progress-bar";

@Component({
  selector: "app-order-cashier",
  templateUrl: "./order-cashier.component.html",
  styleUrls: ["./order-cashier.component.scss"],
})
export class OrderCashierComponent implements OnInit {

  MAX_CATEGORY_DISPLAYED = 8;
  MAX_PRODUCTS_DISPLAYED = 10;
  PLACEHOLDER_CATEGORY: ProductCategory = { display: false, icon: " ", id: 0, order: 0, label: " " };

  products: Product[] = [];
  categories: ProductCategory[] = [];

  categoryPage: number = 0;
  productPage: number = 0;
  selectedCategory?: ProductCategory;
  orderLines: OrderLineCreateDto[] = [];

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    forkJoin([this.productsService.getProducts(), this.productsService.getCategories()])
      .subscribe(([products, categories]) => {
        this.products = products;
        this.categories = categories
          .filter(c => c.display)
          .sort((a, b) => {
            return this.sellableProductsInCategory(b).length - this.sellableProductsInCategory(b).length
              || a.order - b.order;
          });
        this.selectedCategory = categories?.[0];
      });
  }

  toggleCategorySelection(category: ProductCategory): void {
    this.selectedCategory = category;
  }

  openAddCategoryModal(): void {

  }

  get productsInSelectedCategory(): Product[] {
    if (!this.selectedCategory) return [];
    return this.productsInCategory(this.selectedCategory);
  }

  productsInCategory(category: ProductCategory): Product[] {
    return this.products.filter(p => p.categoriesIds.includes(category.id));
  }

  sellableProductsInCategory(category: ProductCategory): Product[] {
    return this.productsInCategory(category).filter(p => p.sellable);
  }

  incrementProduct(product: Product): void {
    const line = this.orderLines.find(l => l.productId === product.id);
    if (line) line.quantity++;
    else {
      const newLine = new OrderLineCreateDto();
      newLine.productId = product.id;
      newLine.quantity = 1;
      this.orderLines.push(newLine);
    }
  }

  decrementProduct(id: number): void {
    const line = this.orderLines.find(l => l.productId === id);
    if (line) {
      line.quantity--;
      if (line.quantity <= 0) this.orderLines.splice(this.orderLines.indexOf(line), 1);
    }
  }

  findProduct(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  totalForLine(line: OrderLineCreateDto): number {
    const product = this.findProduct(line.productId);
    return line.quantity * (product?.price ?? 0);
  }

  get total(): number {
    return this.orderLines
      .reduce((total, line) => total + (this.findProduct(line.productId)?.price ?? 0) * line.quantity, 0);
  }

  get totalReduced(): number {
    return this.orderLines
      .reduce((total, line) => total + (this.findProduct(line.productId)?.price_red ?? 0) * line.quantity, 0);
  }

  getStock(product: Product): number {
    if (!product.useStock) return Infinity;
    return product.stock - (this.orderLines.find(l => l.productId === product.id)?.quantity ?? 0);
  }

  isProductDisabled(product: Product): boolean {
    return !product.sellable || this.getStock(product) <= 0;
  }

  getSeller(): string | undefined {
    return this.authService?.getCurrentUser()?.shortName;
  }

  categoryPageDown(): void {
    this.categoryPage++;
  }

  categoryPageUp(): void {
    this.categoryPage--;
  }

  productPageUp(): void {
    this.productPage--;
  }

  productPageDown(): void {
    this.productPage++;
  }

  get categoriesOnThisPage(): ProductCategory[] {
    const slice = this.categories
      .slice(this.categoryPage * this.MAX_CATEGORY_DISPLAYED, (this.categoryPage + 1) * this.MAX_CATEGORY_DISPLAYED);
    return slice.length < this.MAX_CATEGORY_DISPLAYED
      ? slice.concat(Array(this.MAX_CATEGORY_DISPLAYED - slice.length).fill(this.PLACEHOLDER_CATEGORY))
      : slice;
  }

  get productsOnThisPage(): Product[] {
    return this.productsInSelectedCategory
      .slice(this.productPage * this.MAX_PRODUCTS_DISPLAYED, (this.productPage + 1) * this.MAX_PRODUCTS_DISPLAYED);
  }

  holdTime(line: OrderLineCreateDto, progressBar: MatProgressBar, $event: number) {
    const val = $event / 10;
    console.debug(val)
    progressBar.value = val;
    progressBar.animationEnd.subscribe(() => {
      if(val >= 100) this.orderLines.splice(this.orderLines.indexOf(line), 1);
    })
  }
}
