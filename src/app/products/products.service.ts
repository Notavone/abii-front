import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "./dto/product";
import {HttpClient} from "@angular/common/http";
import {ProductCreateDto} from "./dto/product-create.dto";
import {ProductUpdateDto} from "./dto/product-update.dto";
import {ProductBulkUpdateDto} from "./dto/product-bulk-update.dto";
import {ProductQueryDto} from "./dto/product-query.dto";
import {QueryService} from "../features/query.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = "/api/products";

  constructor(
    private http: HttpClient,
    private queryService: QueryService,
  ) {
  }

  getProducts(query?: ProductQueryDto): Observable<Product[]> {
    let url = `${this.baseUrl}`;
    if (query) url += this.queryService.encode(query);

    return this.http.get<Product[]>(url);
  }

  getProduct(id: number): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  updateProduct(id: number, product: ProductUpdateDto): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.patch<Product>(url, product);
  }

  addProduct(product: ProductCreateDto): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  deleteProduct(id: number): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }

  toggleAvailability(product: Product): Observable<Product> {
    let url = `${this.baseUrl}/${product.id}`;
    const dto: ProductUpdateDto = {available: !product.available};
    return this.http.patch<Product>(url, dto);
  }

  updateBulk(productBulkUpdateDto: ProductBulkUpdateDto): Observable<Product[]> {
    const url = `${this.baseUrl}/bulk`;
    return this.http.patch<Product[]>(url, productBulkUpdateDto);
  }
}
